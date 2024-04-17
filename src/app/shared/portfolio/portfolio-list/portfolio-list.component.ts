import { Component } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [OverviewComponent],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.less',
})
export class PortfolioListComponent {}
