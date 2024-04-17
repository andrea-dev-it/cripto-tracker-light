import { Injectable } from '@angular/core';
import { PortfolioBinancePasquale } from './data/binance-pasquale.service';

@Injectable({ providedIn: 'root' })
export class InitializeService {
  constructor(private portfolioBinancePasquale: PortfolioBinancePasquale) {}
  initPortfolio() {
    return new Promise((resolve) => {
      this.portfolioBinancePasquale.getPortfolioData();
      resolve(true);
    });
  }
}
