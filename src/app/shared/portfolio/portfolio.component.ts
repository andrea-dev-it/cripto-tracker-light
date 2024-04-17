import { Component } from '@angular/core';

import { PortfolioBinancePasquale } from '../../core/services/data/binance-pasquale.service';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [PortfolioOverviewComponent, PortfolioListComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.less',
})
export class PortfolioComponent {
  protected portfolioStats = this.portfolioBinancePasquale.portfolioStats;
  protected portfolioList = this.portfolioBinancePasquale.portfolioList;

  constructor(private portfolioBinancePasquale: PortfolioBinancePasquale) {}
}
