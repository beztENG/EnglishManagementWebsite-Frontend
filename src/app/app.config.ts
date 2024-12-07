import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { provideToastr } from 'ngx-toastr'; // Import provideToastr
import { provideAnimations } from '@angular/platform-browser/animations'; // Import provideAnimations

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])), // Add the interceptor here
    provideToastr(), // Add Toastr provider
    provideAnimations(), // Add this for animations

  ],
};
