import { Injectable, signal } from '@angular/core';
import { ICoin } from '../../../models/interfaces/coin';
import { IPortfolioStats } from '../../../models/interfaces/portfolio-stats';

@Injectable({
  providedIn: 'root',
})
export class PortfolioBinancePasquale {
  public portfolioList = signal<ICoin[]>([]);
  public portfolioStats = signal<IPortfolioStats>(<IPortfolioStats>{});

  constructor() {}
}
