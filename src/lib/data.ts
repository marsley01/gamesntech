export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: "gaming" | "gift-cards" | "streaming";
  featured: boolean;
  trending: boolean;
  platform?: string;
  region?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Free Fire Diamonds",
    slug: "free-fire-diamonds",
    description: "Premium in-game currency. Unlock skins, characters, and more.",
    price: 499,
    image: "/images/products/freefire.svg",
    images: ["/images/products/freefire.svg"],
    category: "gaming",
    featured: true,
    trending: true,
    platform: "Mobile",
  },
  {
    id: "2",
    name: "PUBG UC",
    slug: "pubg-uc",
    description: "Unknown Cash for crates, passes, and premium items.",
    price: 699,
    image: "/images/products/pubg.svg",
    images: ["/images/products/pubg.svg"],
    category: "gaming",
    featured: true,
    trending: true,
    platform: "Mobile, PC",
  },
  {
    id: "3",
    name: "Xbox Game Pass Ultimate",
    slug: "xbox-game-pass-ultimate",
    description: "Hundreds of games. Console, PC, cloud. EA Play included.",
    price: 2499,
    image: "/images/products/xbox.svg",
    images: ["/images/products/xbox.svg"],
    category: "gaming",
    featured: true,
    trending: true,
    platform: "Xbox, PC, Cloud",
  },
  {
    id: "4",
    name: "PlayStation Plus Premium",
    slug: "playstation-plus-premium",
    description: "Online multiplayer, monthly games, classic catalog.",
    price: 1999,
    image: "/images/products/playstation.svg",
    images: ["/images/products/playstation.svg"],
    category: "gaming",
    featured: true,
    trending: false,
    platform: "PS4, PS5",
  },
  {
    id: "5",
    name: "Steam Wallet Credits",
    slug: "steam-wallet-credits",
    description: "Add funds. Buy games, DLC, and more.",
    price: 500,
    image: "/images/products/steam.svg",
    images: ["/images/products/steam.svg"],
    category: "gift-cards",
    featured: false,
    trending: true,
    region: "Global",
  },
  {
    id: "6",
    name: "Spotify Premium",
    slug: "spotify-premium",
    description: "Ad-free. Offline. High-quality audio.",
    price: 599,
    image: "/images/products/spotify.svg",
    images: ["/images/products/spotify.svg"],
    category: "streaming",
    featured: false,
    trending: true,
    platform: "All devices",
  },
  {
    id: "7",
    name: "Netflix Premium",
    slug: "netflix-premium",
    description: "Ultra HD on 4 devices. Spatial audio.",
    price: 1499,
    image: "/images/products/netflix.svg",
    images: ["/images/products/netflix.svg"],
    category: "streaming",
    featured: false,
    trending: true,
    platform: "All devices",
  },
];

export const categories = [
  { slug: "gaming", name: "Gaming", description: "Premium gaming subscriptions and credits", accent: "blue", emoji: "🎮" },
  { slug: "gift-cards", name: "Gift Cards", description: "Digital gift cards for every platform", accent: "gold", emoji: "🎁" },
  { slug: "streaming", name: "Streaming", description: "Premium entertainment subscriptions", accent: "red", emoji: "📺" },
] as const;

export type OrderStatus = "pending" | "confirmed" | "processing" | "completed" | "failed";

export type Order = {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  category: string;
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
