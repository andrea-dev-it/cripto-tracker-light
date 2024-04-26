export interface ITrade {
  tradeNum: number;
  date: string;
  crypto: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  purchase: number;
  sellPrice: number;
  revenue: number;
  profit: number;
  profitPerc: number;
}
