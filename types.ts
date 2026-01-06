export interface TrendData {
  month: string;
  interest: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  profitMargin: number; // Percentage
  saturationScore: number; // 0-100
  viralityScore: number; // 0-100
  sources: ('Meta' | 'YouTube' | 'TikTok' | 'Pinterest')[];
  trendData: TrendData[];
  marketingAngle: string;
  targetAudience: string;
  imageUrl: string;
  category: string;
  productUrl?: string; // Link to the real product listing
}

export interface SearchFilters {
  niche: string;
  sources: string[];
}