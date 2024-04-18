import { Component } from '@angular/core';
import { PortfolioBinancePasquale } from '../../core/services/data/binance-pasquale.service';
import { LoaderSpinnerComponent } from '../../shared/loader-spinner/loader-spinner.component';
import { PortfolioComponent } from '../../shared/portfolio/portfolio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PortfolioComponent, LoaderSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  protected loading = this.portfolioBinancePasquale.isLoading;

  constructor(private portfolioBinancePasquale: PortfolioBinancePasquale) {}
}
