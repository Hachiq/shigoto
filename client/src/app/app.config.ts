import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { withCredentialsInterceptor } from '../core/services/with-credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        withCredentialsInterceptor
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
