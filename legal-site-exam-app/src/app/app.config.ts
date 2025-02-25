import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';

import { 
  backendErrorInterceptorService, 
  GlobalService, 
  CachedDataService, 
  SnackbarService, 
  SpeechFilterService 
} from './services';

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
    SpeechFilterService,
    provideAnimationsAsync()
  ]
};
