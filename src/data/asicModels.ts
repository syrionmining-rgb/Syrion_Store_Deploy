export interface AsicModel {
  id: string;
  name: string;
  brand: string;
  hashrate: number; // TH/s
  power: number; // Watts
  efficiency: number; // J/TH
  algorithm: string;
  price: number; // USD
  dailyRevenue: number; // USD estimated (based on snapshot)
  dailyPowerCost: number; // USD at $0.06/kWh
  releaseYear: number;
  featured?: boolean;
  badge?: string;
}

// Snapshot-based estimates (Whattomine-like calculation)
// BTC price ~$42,000, network difficulty snapshot
// Revenue per TH/s/day ≈ $0.065 (approximation)
const REVENUE_PER_TH = 0.065;
const POWER_COST_PER_KWH = 0.06;

function calculateDailyPowerCost(power: number): number {
  return (power / 1000) * 24 * POWER_COST_PER_KWH;
}

function calculateDailyRevenue(hashrate: number): number {
  return hashrate * REVENUE_PER_TH;
}

export const asicModels: AsicModel[] = [
  {
    id: "s19k-pro",
    name: "Antminer S19K Pro",
    brand: "Bitmain",
    hashrate: 120,
    power: 2760,
    efficiency: 23,
    algorithm: "SHA-256",
    price: 17900,
    dailyRevenue: calculateDailyRevenue(120),
    dailyPowerCost: calculateDailyPowerCost(2760),
    releaseYear: 2023,
  },
  {
    id: "s19-pro-plus-plus",
    name: "Antminer S19 Pro++",
    brand: "Bitmain",
    hashrate: 198,
    power: 3250,
    efficiency: 16.41,
    algorithm: "SHA-256",
    price: 19900,
    dailyRevenue: calculateDailyRevenue(198),
    dailyPowerCost: calculateDailyPowerCost(3250),
    releaseYear: 2023,
    badge: "Custo-Benefício",
  },
  {
    id: "t21",
    name: "Antminer T21",
    brand: "Bitmain",
    hashrate: 190,
    power: 3610,
    efficiency: 19,
    algorithm: "SHA-256",
    price: 29950,
    dailyRevenue: calculateDailyRevenue(190),
    dailyPowerCost: calculateDailyPowerCost(3610),
    releaseYear: 2024,
    badge: "Popular",
  },
  {
    id: "s21-plus",
    name: "Antminer S21+",
    brand: "Bitmain",
    hashrate: 235,
    power: 3878,
    efficiency: 16.5,
    algorithm: "SHA-256",
    price: 32250,
    dailyRevenue: calculateDailyRevenue(235),
    dailyPowerCost: calculateDailyPowerCost(3878),
    releaseYear: 2024,
    featured: true,
    badge: "Mais Vendido",
  },
  {
    id: "s21-xp",
    name: "Antminer S21 XP",
    brand: "Bitmain",
    hashrate: 270,
    power: 3645,
    efficiency: 13.5,
    algorithm: "SHA-256",
    price: 44775,
    dailyRevenue: calculateDailyRevenue(270),
    dailyPowerCost: calculateDailyPowerCost(3645),
    releaseYear: 2024,
    featured: true,
    badge: "Premium",
  },
];

export const getModelById = (id: string): AsicModel | undefined => {
  return asicModels.find((model) => model.id === id);
};
