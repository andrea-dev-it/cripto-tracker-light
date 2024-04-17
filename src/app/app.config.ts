import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { InitializeService } from './core/services/initialize.service';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitializeService],
      multi: true,
    },
    provideRouter(routes),
    provideHttpClient(),
  ],
};

export function initializeApp(appService: InitializeService) {
  return () => appService.initPortfolio();
}
