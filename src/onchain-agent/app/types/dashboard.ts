export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    image: string;
    currentPrice: number;
    marketCap: number;
    priceChangePercentage24h: number;
    totalVolume: number;
    circulatingSupply: number;
    ath: number;
    athChangePercentage: number;
  }
  
  export interface PortfolioItem {
    id: string;
    coinId: string;
    type: 'buy' | 'sell';
    quantity: number;
    priceAtPurchase: number;
    date: string;
    notes?: string;
  }
        