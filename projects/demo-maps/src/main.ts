import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

(window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
