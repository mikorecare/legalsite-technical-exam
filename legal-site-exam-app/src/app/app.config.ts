import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from './services/global.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CachedDataService } from './services/cached.data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { SnackbarService } from './services/snackbar.service';
import { backendErrorInterceptorService } from './services/backendInterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withInterceptors([backendErrorInterceptorService])),
    importProvidersFrom(
      ReactiveFormsModule,
      MaterialModule
    ),
    GlobalService,
    CachedDataService,
    SnackbarService,
    provideAnimationsAsync()
  ]
};
