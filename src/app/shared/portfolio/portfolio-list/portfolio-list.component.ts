import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICoin } from '../../../models/interfaces/coin';
import { OverviewComponent } from './overview/overview.component';
import { TradesComponent } from './trades/trades.component';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [NgClass, OverviewComponent, TradesComponent],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.less',
})
export class PortfolioListComponent {
  portfolioList = input.required<ICoin[]>();
  currentFilter = 'trades';

  onButtonClick(selected: string) {
    switch (selected) {
      case 'portfolio':
        this.currentFilter = 'portfolio';
        break;
      case 'trades':
        this.currentFilter = 'trades';
        break;
    }
  }
}
