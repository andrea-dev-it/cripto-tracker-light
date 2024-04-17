import { Injectable, signal } from '@angular/core';
import { Coin } from '../../../models/enties/coin';
import { ICoin } from '../../../models/interfaces/coin';
import { IPortfolioStats } from '../../../models/interfaces/portfolio-stats';
import { GenericUtils } from '../../../models/utils/generic-utils';
import { GoogleSheetService } from '../http/google-sheet.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioBinancePasquale {
  public portfolioList = signal<ICoin[]>([]);
  public portfolioStats = signal<IPortfolioStats>(<IPortfolioStats>{});
  public isLoading = signal(false);
  protected logoPath = '../../../assets/img/cripto-logo/';

  constructor(private googleSheetService: GoogleSheetService) {}

  getPortfolioData() {
    this.isLoading.set(true);
    if (
      !this.shouldFetchData() &&
      !!localStorage.getItem(GenericUtils.PORTFOLIO_LIST) &&
      !!localStorage.getItem(GenericUtils.PORTFOLIO_STATS)
    ) {
      const portfolioListData = JSON.parse(
        localStorage.getItem(GenericUtils.PORTFOLIO_LIST)!
      );

      const portfolioStatsData = JSON.parse(
        localStorage.getItem(GenericUtils.PORTFOLIO_STATS)!
      );

      this.portfolioList.set(portfolioListData);
      this.portfolioStats.set(portfolioStatsData);

      this.isLoading.set(false);
    } else {
      this.isLoading.set(true);
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

        localStorage.setItem(
          GenericUtils.PORTFOLIO_LIST,
          JSON.stringify(this.portfolioList())
        );

        localStorage.setItem(
          GenericUtils.PORTFOLIO_STATS,
          JSON.stringify(this.portfolioStats())
        );

        localStorage.setItem(GenericUtils.LAST_UPDATE, new Date().toString());

        this.isLoading.set(false);

        console.log('COIN LIST UPDATED', this.portfolioList());
        console.log('COIN LIST UPDATED', this.portfolioStats());
      });
    }
  }

  public shouldFetchData() {
    const storedDate = localStorage.getItem(GenericUtils.LAST_UPDATE)
      ? localStorage.getItem(GenericUtils.LAST_UPDATE)
      : null;

    if (storedDate) {
      const date = new Date(storedDate);

      // Get timestamp in milliseconds
      const dateMs = date.getTime();
      const currentMs = new Date().getTime();

      // Difference in milliseconds
      const diffMs = currentMs - dateMs;

      // Convert to minutes
      const diffMins = diffMs / 1000 / 60;

      if (diffMins > 2) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
