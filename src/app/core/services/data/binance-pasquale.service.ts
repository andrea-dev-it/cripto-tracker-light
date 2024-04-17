import { Injectable, signal } from '@angular/core';
import { Coin } from '../../../models/enties/coin';
import { ICoin } from '../../../models/interfaces/coin';
import { IPortfolioStats } from '../../../models/interfaces/portfolio-stats';
import { GoogleSheetService } from '../http/google-sheet.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioBinancePasquale {
  public portfolioList = signal<ICoin[]>([]);
  public portfolioStats = signal<IPortfolioStats>(<IPortfolioStats>{});
  protected logoPath = '../../../assets/img/cripto-logo/';

  constructor(private googleSheetService: GoogleSheetService) {}

  getPortofolioData() {
    this.googleSheetService.fetchPortfolioData().subscribe((data: any) => {
      console.log('DATA GOOGLE', data.values);

      data.values.slice(1, -1).forEach((coin: any) => {
        let singleCoin = new Coin(coin);
        singleCoin.logo =
          this.logoPath + singleCoin.ticker.toLowerCase() + '.png';
        this.portfolioList.update((prev) => [...prev, singleCoin]);
      });

      const portfolioStats = data.values[data.values.length - 1];

      this.portfolioStats.set({
        totalDeposits: portfolioStats[5],
        totalFees: data.values[1][13],
        current: portfolioStats[9],
        profits: portfolioStats[10],
        profitsPerc: portfolioStats[11] * 100,
        gifts: data.values[1][14],
      });

      console.log('COIN LIST UPDATED', this.portfolioList());
      console.log('COIN LIST UPDATED', this.portfolioStats());
    });
  }

  getPortfolioStats() {}
}
