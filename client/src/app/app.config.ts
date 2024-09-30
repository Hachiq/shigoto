import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from '../core/services/auth.interceptor';
import { ErrorHandlerService } from '../core/services/error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
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
