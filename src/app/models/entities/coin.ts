import { ICoin } from '../interfaces/coin';

export class Coin implements ICoin {
  name: string;
  ticker: string;
  quantity: number;
  deposits: number;
  depositsPerc: number;
  current: number;
  currentPerc?: number;
  price: number;
  averagePrice: number;
  profits: number;
  profitsPerc: number;
  logo: string;

  constructor(coin: any[]) {
    this.name = coin[2];
    this.ticker = coin[3];
    this.quantity = coin[4];
    this.deposits = coin[5];
    this.depositsPerc = coin[6] * 100;
    this.current = coin[9];
    this.price = coin[8];
    this.averagePrice = coin[7];
    this.profits = coin[10];
    this.profitsPerc = coin[11] * 100;
    this.logo = '';
  }
}
