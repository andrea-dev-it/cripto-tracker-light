import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  DepositsNoDecimalPipe,
  ProfitsNoDecimalPipe,
  ProfitsPercPipe,
} from '../../../core/pipes/pipes';
import { IPortfolioStats } from '../../../models/interfaces/portfolio-stats';

@Component({
  selector: 'app-portfolio-overview',
  standalone: true,
  templateUrl: './portfolio-overview.component.html',
  styleUrl: './portfolio-overview.component.less',
  imports: [
    NgStyle,
    DepositsNoDecimalPipe,
    ProfitsPercPipe,
    ProfitsNoDecimalPipe,
  ],
})
export class PortfolioOverviewComponent {
  portfolioStats = input.required<IPortfolioStats>();
}
