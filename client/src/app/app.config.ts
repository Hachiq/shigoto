import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { withCredentialsInterceptor } from '../core/interceptors/with-credentials.interceptor';
import { routes } from './app.routes';
import { retryInterceptor } from '../core/interceptors/retry.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        withCredentialsInterceptor,
        retryInterceptor
      ]),
      withFetch(),
      withInterceptorsFromDi()
    ),
    provideClientHydration(),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ]
};
