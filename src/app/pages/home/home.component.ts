import { Component } from '@angular/core';
import { PortfolioComponent } from '../../shared/portfolio/portfolio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PortfolioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {}
