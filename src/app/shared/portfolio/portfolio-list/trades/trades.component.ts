import { DatePipe, NgStyle } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DepositsPipe, FormatNumberItPipe } from '../../../../core/pipes/pipes';
import { PortfolioBinancePasquale } from '../../../../core/services/data/binance-pasquale.service';
import { ITrade } from '../../../../models/interfaces/trade';

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [NgStyle, DepositsPipe, DatePipe, FormatNumberItPipe],
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.less',
})
export class TradesComponent {
  protected tradeList = this.portfolioBinancePasquale.portfolioTrades;
  protected currentFilter = signal('all');
  protected tradeListFilter = signal<ITrade[]>([]);
  protected yearList = computed(() =>
    this.tradeList().map((trade) => new Date(trade.date).getFullYear())
  );
  protected totalProfit = computed(() =>
    this.tradeList().reduce((acc, curr) => acc + curr.profit, 0)
  );

  constructor(private portfolioBinancePasquale: PortfolioBinancePasquale) {
    this.tradeListFilter.set([...this.tradeList()]);
  }

  onSelectYear(data: any) {
    const year = data.target.value;

    if (year == 'all') {
      this.tradeListFilter.set([...this.tradeList()]);
    } else {
      this.tradeListFilter.set([
        ...this.tradeList().filter((trade) => {
          return new Date(trade.date).getFullYear() == year;
        }),
      ]);
    }
  }
}
