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

import { BasicAuthService } from './auth/basic-auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './auth/http-auth.interceptor';
import { HttpErrorInterceptor } from './auth/http-error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation()),
    importProvidersFrom(BrowserModule, ClarityModule, FormsModule, ReactiveFormsModule),
    provideAnimations(),
    AlertService, ProgressService,
    BasicAuthService,
    {
        provide: HTTP_INTERCEPTORS,
        // useClass: TokenInterceptor,
        useFactory: (authService) => {
            return new HttpAuthInterceptor(authService);
        },
        deps: [BasicAuthService],
        multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
