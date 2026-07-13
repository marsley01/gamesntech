let cachedToken: { token: string; expiresAt: number } | null = null;

const MPESA_ENV = process.env.MPESA_ENV || 'sandbox';
const BASE_URL =
  MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const res = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get M-Pesa access token: ${res.status} ${text}`);
  }

  const data = await res.json();

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  console.log('[M-Pesa] Access token acquired, expires in', data.expires_in, 'seconds');
  return data.access_token;
}

function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function generatePassword(shortcode: string, passkey: string, timestamp: string): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
}

export async function initiateSTKPush({
  phone,
  amount,
  orderId,
  productTitle,
}: {
  phone: string;
  amount: number;
  orderId: string;
  productTitle: string;
}): Promise<string> {
  const token = await getAccessToken();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const timestamp = getTimestamp();
  const password = generatePassword(shortcode, passkey, timestamp);

  const callbackUrl = `${process.env.NEXT_PUBLIC_URL}/api/mpesa/callback`;

  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: `GNT-${orderId}`,
    TransactionDesc: productTitle.slice(0, 12),
  };

  console.log('[M-Pesa] Initiating STK Push for order', orderId, 'amount', amount, 'phone', phone);

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!data.CheckoutRequestID) {
    console.error('[M-Pesa] STK Push failed:', data);
    throw new Error(
      `STK Push failed: ${data.errorMessage || data.ResponseDescription || 'Unknown error'}`
    );
  }

  console.log('[M-Pesa] STK Push successful, CheckoutRequestID:', data.CheckoutRequestID);
  return data.CheckoutRequestID;
}

export async function verifyPayment(
  checkoutRequestId: string
): Promise<'pending' | 'completed' | 'failed'> {
  const token = await getAccessToken();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const timestamp = getTimestamp();
  const password = generatePassword(shortcode, passkey, timestamp);

  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestId,
  };

  const res = await fetch(`${BASE_URL}/mpesa/stkpushquery/v1/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.ResultCode === '0') return 'completed';
  if (data.ResultCode === '1037' || data.ResultCode === '1032') return 'pending';
  return 'failed';
}

export async function initiateB2CPayment({
  amount,
  phone,
  orderId,
}: {
  amount: number;
  phone: string;
  orderId: string;
}): Promise<string> {
  const token = await getAccessToken();
  const initiatorName = process.env.MPESA_B2C_INITIATOR_NAME!;
  const securityCredential = process.env.MPESA_B2C_SECURITY_CREDENTIAL!;
  const shortcode = process.env.MPESA_SHORTCODE!;
  const resultUrl = `${process.env.NEXT_PUBLIC_URL}/api/mpesa/b2c/callback`;
  const timeoutUrl = `${process.env.NEXT_PUBLIC_URL}/api/mpesa/b2c/callback`;

  const body = {
    InitiatorName: initiatorName,
    SecurityCredential: securityCredential,
    CommandID: 'BusinessPayment',
    Amount: amount,
    PartyA: shortcode,
    PartyB: phone,
    Remarks: `GNT payout ${orderId}`,
    QueueTimeOutURL: timeoutUrl,
    ResultURL: resultUrl,
    Occasion: '',
  };

  console.log('[M-Pesa B2C] Initiating payout for', phone, 'amount', amount);

  const res = await fetch(`${BASE_URL}/mpesa/b2c/v1/paymentrequest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.ResponseCode !== '0') {
    console.error('[M-Pesa B2C] Failed:', data);
    throw new Error(`B2C failed: ${data.ResponseDescription || 'Unknown error'}`);
  }

  console.log('[M-Pesa B2C] Initiated, OriginatorConversationID:', data.OriginatorConversationID);
  return data.OriginatorConversationID;
}
