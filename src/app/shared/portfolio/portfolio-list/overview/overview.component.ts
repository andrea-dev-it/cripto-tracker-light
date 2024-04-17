import { NgStyle } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import {
  DepositsNoDecimalPipe,
  DepositsPipe,
  ProfitsNoDecimalPipe,
  ProfitsPercPipe,
} from '../../../../core/pipes/pipes';
import { ICoin } from '../../../../models/interfaces/coin';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.less',
  imports: [
    NgStyle,
    DepositsNoDecimalPipe,
    DepositsPipe,
    ProfitsNoDecimalPipe,
    ProfitsPercPipe,
  ],
})
export class OverviewComponent {
  portfolioList = input.required<ICoin[]>();
  protected currentSorting = signal('profits');
  protected sortedCoins = computed(() => {
    switch (this.currentSorting()) {
      case 'profits':
        return this.portfolioList().sort((a, b) => b.profits - a.profits);
      case 'profitsPerc':
        return this.portfolioList().sort(
          (a, b) => b.profitsPerc - a.profitsPerc
        );
      case 'deposits':
        return this.portfolioList().sort((a, b) => b.deposits - a.deposits);
      default:
        return this.portfolioList();
    }
  });

  onSortDepositClick() {
    this.currentSorting.set('deposits');
  }

  onSortProfitClick() {
    this.currentSorting() == 'profits'
      ? this.currentSorting.set('profitsPerc')
      : this.currentSorting.set('profits');
  }
}
