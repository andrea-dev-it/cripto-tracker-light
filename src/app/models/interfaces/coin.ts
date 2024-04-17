export interface ICoin {
  name: string;
  ticker: string;
  logo: string;
  quantity: number;
  deposits: number;
  depositsPerc: number;
  current: number;
  currentPerc?: number;
  price: number;
  averagePrice: number;
  profits: number;
  profitsPerc: number;
  earnQuantity?: number;
  earn?: number;
}
