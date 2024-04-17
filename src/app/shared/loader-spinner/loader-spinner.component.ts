import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.less',
})
export class LoaderSpinnerComponent {
  loading = input<boolean>(false);
}
