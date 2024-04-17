import { Component, input } from '@angular/core';
import { ICoin } from '../../../models/interfaces/coin';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [OverviewComponent],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.less',
})
export class PortfolioListComponent {
  portfolioList = input.required<ICoin[]>();
}
