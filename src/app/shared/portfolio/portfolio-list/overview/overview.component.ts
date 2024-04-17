import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.less',
})
export class OverviewComponent {
  protected currentSorting: string = 'profits';

  onSortDepositClick() {
    this.currentSorting = 'deposits';
  }

  onSortProfitClick() {
    this.currentSorting == 'profits'
      ? (this.currentSorting = 'profitsPerc')
      : (this.currentSorting = 'profits');
  }
}
