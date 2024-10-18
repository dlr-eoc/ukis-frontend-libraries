import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AlertService } from './components/global-alert/alert.service';
import { ProgressService } from './components/global-progress/progress.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation()),
    importProvidersFrom(BrowserModule, ClarityModule, FormsModule, ReactiveFormsModule),
    provideAnimations(),
    AlertService, ProgressService, provideHttpClient(withInterceptorsFromDi()),
  ]
};
