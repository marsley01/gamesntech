export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: "gaming" | "software" | "ai" | "gift-cards" | "streaming";
  featured: boolean;
  trending: boolean;
  badge?: string;
  rating: number;
  reviews: number;
  platform?: string;
  region?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "NVIDIA GeForce NOW",
    slug: "nvidia-geforce-now",
    description: "Cloud gaming with RTX 4080. Play your library anywhere.",
    price: 1499,
    image: "/products/geforce.jpg",
    category: "gaming",
    featured: true,
    trending: true,
    badge: "Best Seller",
    rating: 4.8,
    reviews: 2341,
    platform: "PC, Mobile, TV",
  },
  {
    id: "2",
    name: "Xbox Game Pass Ultimate",
    slug: "xbox-game-pass-ultimate",
    description: "Hundreds of games. Console, PC, cloud. EA Play included.",
    price: 2499,
    image: "/products/xbox.jpg",
    category: "gaming",
    featured: true,
    trending: true,
    badge: "Popular",
    rating: 4.9,
    reviews: 4567,
    platform: "Xbox, PC, Cloud",
  },
  {
    id: "3",
    name: "PlayStation Plus Premium",
    slug: "playstation-plus-premium",
    description: "Online multiplayer, monthly games, classic catalog.",
    price: 1999,
    image: "/products/psplus.jpg",
    category: "gaming",
    featured: true,
    trending: false,
    rating: 4.7,
    reviews: 3210,
    platform: "PS4, PS5",
  },
  {
    id: "4",
    name: "Steam Wallet Credits",
    slug: "steam-wallet-credits",
    description: "Add funds. Buy games, DLC, and more.",
    price: 500,
    image: "/products/steam.jpg",
    category: "gift-cards",
    featured: false,
    trending: true,
    badge: "Trending",
    rating: 4.6,
    reviews: 5678,
    region: "Global",
  },
  {
    id: "5",
    name: "Google Play Gift Card",
    slug: "google-play-gift-card",
    description: "Apps, games, movies, books, and more.",
    price: 300,
    image: "/products/googleplay.jpg",
    category: "gift-cards",
    featured: false,
    trending: false,
    rating: 4.5,
    reviews: 3456,
    region: "Global",
  },
  {
    id: "6",
    name: "Apple App Store & iTunes",
    slug: "apple-app-store-itunes",
    description: "Apps, games, music, movies, iCloud+, Arcade.",
    price: 400,
    image: "/products/appstore.jpg",
    category: "gift-cards",
    featured: false,
    trending: false,
    rating: 4.7,
    reviews: 2890,
    region: "Global",
  },
  {
    id: "7",
    name: "Microsoft 365 Family",
    slug: "microsoft-365-family",
    description: "Premium Office, 6TB cloud, security for 6.",
    price: 3999,
    image: "/products/m365.jpg",
    category: "software",
    featured: true,
    trending: false,
    badge: "New",
    rating: 4.6,
    reviews: 1234,
    platform: "Windows, Mac, Mobile",
  },
  {
    id: "8",
    name: "Adobe Creative Cloud",
    slug: "adobe-creative-cloud",
    description: "20+ creative apps. Photoshop, Premiere, AE.",
    price: 5499,
    image: "/products/adobe.jpg",
    category: "software",
    featured: false,
    trending: false,
    rating: 4.5,
    reviews: 2100,
    platform: "Windows, Mac",
  },
  {
    id: "9",
    name: "ChatGPT Plus",
    slug: "chatgpt-plus",
    description: "GPT-4, DALL·E 3, advanced reasoning, plugins.",
    price: 2599,
    image: "/products/chatgpt.jpg",
    category: "ai",
    featured: true,
    trending: true,
    badge: "Hot",
    rating: 4.9,
    reviews: 8901,
    platform: "Web, Mobile",
  },
  {
    id: "10",
    name: "GitHub Copilot",
    slug: "github-copilot",
    description: "AI pair programmer. Real-time code suggestions.",
    price: 1099,
    image: "/products/copilot.jpg",
    category: "ai",
    featured: false,
    trending: true,
    rating: 4.8,
    reviews: 4560,
    platform: "VS Code, JetBrains, Neovim",
  },
  {
    id: "11",
    name: "Midjourney",
    slug: "midjourney",
    description: "Generate stunning visuals with AI. Pro plan.",
    price: 3599,
    image: "/products/midjourney.jpg",
    category: "ai",
    featured: false,
    trending: true,
    badge: "Popular",
    rating: 4.7,
    reviews: 6780,
    platform: "Discord, Web",
  },
  {
    id: "12",
    name: "Netflix Premium",
    slug: "netflix-premium",
    description: "Ultra HD on 4 devices. Spatial audio.",
    price: 1499,
    image: "/products/netflix.jpg",
    category: "streaming",
    featured: false,
    trending: true,
    rating: 4.6,
    reviews: 7890,
    platform: "All devices",
  },
  {
    id: "13",
    name: "Spotify Premium",
    slug: "spotify-premium",
    description: "Ad-free. Offline. High-quality audio.",
    price: 599,
    image: "/products/spotify.jpg",
    category: "streaming",
    featured: false,
    trending: true,
    badge: "Popular",
    rating: 4.7,
    reviews: 5670,
    platform: "All devices",
  },
  {
    id: "14",
    name: "YouTube Premium",
    slug: "youtube-premium",
    description: "Ad-free. Background play. YouTube Music.",
    price: 699,
    image: "/products/ytpremium.jpg",
    category: "streaming",
    featured: false,
    trending: false,
    rating: 4.4,
    reviews: 3450,
    platform: "All devices",
  },
  {
    id: "15",
    name: "Discord Nitro",
    slug: "discord-nitro",
    description: "HD streaming, custom emoji, bigger uploads.",
    price: 899,
    image: "/products/discord.jpg",
    category: "gaming",
    featured: false,
    trending: false,
    badge: "Gamer Pick",
    rating: 4.5,
    reviews: 2340,
    platform: "Desktop, Mobile",
  },
  {
    id: "16",
    name: "Canva Pro",
    slug: "canva-pro",
    description: "Premium templates, AI tools, brand kits.",
    price: 2499,
    image: "/products/canva.jpg",
    category: "software",
    featured: false,
    trending: false,
    rating: 4.5,
    reviews: 1890,
    platform: "Web, Mobile",
  },
  {
    id: "17",
    name: "NordVPN",
    slug: "nordvpn",
    description: "6000+ servers. Threat protection. Meshnet.",
    price: 1199,
    image: "/products/nordvpn.jpg",
    category: "software",
    featured: false,
    trending: false,
    rating: 4.6,
    reviews: 4560,
    platform: "All devices",
  },
];

export const categories = [
  { slug: "gaming", name: "Gaming", description: "Premium gaming subscriptions and credits", accent: "blue", emoji: "🎮" },
  { slug: "software", name: "Software", description: "Professional tools and productivity", accent: "purple", emoji: "💻" },
  { slug: "ai", name: "AI", description: "Artificial intelligence tools and platforms", accent: "cyan", emoji: "🤖" },
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
