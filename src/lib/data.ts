export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: "gaming" | "software" | "saas";
  featured: boolean;
  popular: boolean;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "NVIDIA GeForce NOW",
    slug: "nvidia-geforce-now",
    description: "Cloud gaming service with RTX 4080 performance. Play your favorite PC games on any device with ultra-low latency.",
    price: 1499,
    image: "/products/geforce.jpg",
    category: "gaming",
    featured: true,
    popular: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Xbox Game Pass Ultimate",
    slug: "xbox-game-pass-ultimate",
    description: "Unlimited access to hundreds of high-quality games on console, PC, and cloud. EA Play included.",
    price: 2499,
    image: "/products/xbox.jpg",
    category: "gaming",
    featured: true,
    popular: true,
    badge: "Popular",
  },
  {
    id: "3",
    name: "PlayStation Plus Premium",
    slug: "playstation-plus-premium",
    description: "Access to online multiplayer, monthly games, and a massive catalog of PS5 and classic titles.",
    price: 1999,
    image: "/products/psplus.jpg",
    category: "gaming",
    featured: true,
    popular: false,
  },
  {
    id: "4",
    name: "Steam Wallet Credits",
    slug: "steam-wallet-credits",
    description: "Add funds to your Steam Wallet. Buy games, DLC, and more from the world's largest PC gaming store.",
    price: 500,
    image: "/products/steam.jpg",
    category: "gaming",
    featured: false,
    popular: true,
    badge: "Trending",
  },
  {
    id: "5",
    name: "Google Play Gift Card",
    slug: "google-play-gift-card",
    description: "Redeem for apps, games, movies, books, and more on the Google Play Store.",
    price: 300,
    image: "/products/googleplay.jpg",
    category: "gaming",
    featured: false,
    popular: false,
  },
  {
    id: "6",
    name: "Apple App Store & iTunes",
    slug: "apple-app-store-itunes",
    description: "For apps, games, music, movies, iCloud+, and Apple Arcade. Works across all Apple devices.",
    price: 400,
    image: "/products/appstore.jpg",
    category: "gaming",
    featured: false,
    popular: false,
  },
  {
    id: "7",
    name: "Microsoft 365 Family",
    slug: "microsoft-365-family",
    description: "Premium Office apps, 6TB cloud storage, and advanced security for up to 6 people.",
    price: 3999,
    image: "/products/m365.jpg",
    category: "software",
    featured: true,
    popular: false,
    badge: "New",
  },
  {
    id: "8",
    name: "Adobe Creative Cloud",
    slug: "adobe-creative-cloud",
    description: "Full suite of 20+ creative apps including Photoshop, Premiere Pro, After Effects, and more.",
    price: 5499,
    image: "/products/adobe.jpg",
    category: "software",
    featured: false,
    popular: false,
  },
  {
    id: "9",
    name: "Spotify Premium",
    slug: "spotify-premium",
    description: "Ad-free music streaming with offline downloads, high-quality audio, and personalized playlists.",
    price: 599,
    image: "/products/spotify.jpg",
    category: "saas",
    featured: false,
    popular: true,
    badge: "Popular",
  },
  {
    id: "10",
    name: "Netflix Premium",
    slug: "netflix-premium",
    description: "Ultra HD streaming on 4 devices, spatial audio, and downloads on up to 6 devices.",
    price: 1499,
    image: "/products/netflix.jpg",
    category: "saas",
    featured: false,
    popular: true,
  },
  {
    id: "11",
    name: "YouTube Premium",
    slug: "youtube-premium",
    description: "Ad-free videos, background play, downloads, and YouTube Music Premium included.",
    price: 699,
    image: "/products/ytpremium.jpg",
    category: "saas",
    featured: false,
    popular: false,
  },
  {
    id: "12",
    name: "Discord Nitro",
    slug: "discord-nitro",
    description: "Enhanced chat with HD streaming, custom emoji anywhere, bigger uploads, and profile perks.",
    price: 899,
    image: "/products/discord.jpg",
    category: "saas",
    featured: false,
    popular: false,
    badge: "Gamer Pick",
  },
  {
    id: "13",
    name: "Canva Pro",
    slug: "canva-pro",
    description: "Unlock premium templates, AI-powered design tools, brand kits, and team collaboration.",
    price: 2499,
    image: "/products/canva.jpg",
    category: "software",
    featured: false,
    popular: false,
  },
  {
    id: "14",
    name: "NordVPN",
    slug: "nordvpn",
    description: "Top-rated VPN with 6000+ servers, threat protection, and Meshnet for secure browsing.",
    price: 1199,
    image: "/products/nordvpn.jpg",
    category: "saas",
    featured: false,
    popular: false,
  },
];

export const categories = [
  { slug: "gaming", name: "Gaming", description: "Gift cards, credits & subscriptions for top gaming platforms" },
  { slug: "software", name: "Software", description: "Professional tools and productivity suites" },
  { slug: "saas", name: "SaaS", description: "Streaming, cloud services & digital subscriptions" },
] as const;

export type OrderStatus = "pending" | "confirmed" | "processing" | "completed" | "failed";

export type Order = {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  status: OrderStatus;
  game_id?: string;
  code?: string;
  created_at: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  payment_method: string;
};

export type DashboardMetrics = {
  revenueToday: number;
  revenueWeek: number;
  revenueMonth: number;
  ordersTotal: number;
  ordersPending: number;
  ordersCompleted: number;
  ordersFailed: number;
  walletBalance: number;
  topProducts: { name: string; count: number; revenue: number }[];
};
