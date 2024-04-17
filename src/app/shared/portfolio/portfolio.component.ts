import { Component, signal } from '@angular/core';
import { IPortfolioStats } from '../../models/interfaces/portfolio-stats';
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
  protected portfolioStats = signal<IPortfolioStats>({
    gifts: 0,
    totalFees: 0,
    totalDeposits: 1000,
  });
}
