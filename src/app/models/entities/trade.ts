import { ITrade } from '../interfaces/trade';

export class Trade implements ITrade {
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

  constructor(trade: any[]) {
    this.tradeNum = trade[0];
    this.date = trade[1];
    this.crypto = trade[3];
    this.ticker = trade[4];
    this.quantity = trade[5];
    this.buyPrice = trade[6];
    this.purchase = trade[7];
    this.sellPrice = trade[8];
    this.revenue = trade[9];
    this.profit = trade[10];
    this.profitPerc = trade[11] * 100;
  }
}
