import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AlertService } from './components/global-alert/global-alert-svc';
import { ProgressService } from './components/global-progress/global-progress-svc';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), provideRouter(routes, withHashLocation()),
    importProvidersFrom(BrowserModule, ClarityModule, FormsModule, ReactiveFormsModule),
    provideAnimations(),
    AlertService, ProgressService, provideHttpClient(withXhr(), withInterceptorsFromDi()),
  ]
};