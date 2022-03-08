import { Component } from '@angular/core';

import './components/icons/ukis';

import { AlertService, IAlert } from './components/global-alert/alert.service';
import { ProgressService, IProgress } from './components/global-progress/progress.service';
import { Router, Routes } from '@angular/router';
import { appVersion } from '../environments/version';

interface IUi {
  floating: boolean;
  flipped: boolean;
  alert: null | IAlert;
  progress: null | IProgress;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  shortTitle = '';
  version = (appVersion === '0.0.0-PLACEHOLDER') ? null : appVersion;

  ui: IUi = {
    floating: false,
    flipped: false,
    alert: null,
    progress: null
  };

  routes: Routes;

  constructor(
    private alertService: AlertService,
    private progressService: ProgressService,
    public router: Router
  ) {
    this.init();
    this.routes = this.router.config.filter(r => r.data);
  }

  init() {
    this.getHtmlMeta(['title', 'version', 'description', 'short-title']);

    if (this['TITLE']) {
      this.title = this['TITLE'];
    }
    if (this['SHORT-TITLE']) {
      this.shortTitle = this['SHORT-TITLE'];
    }

    this.alertService.alert$.subscribe((ev) => {
      this.setAlert(ev);
    });

    this.progressService.progress$.subscribe((ev) => {
      this.showProgress(ev);
    });
  }

  showProgress = (progress: IProgress) => {
    this.ui.progress = progress;
  }

  setAlert = (alert: IAlert) => {
    this.ui.alert = alert;
  }

  getHtmlMeta(names: string[]) {
    const ref = document.getElementsByTagName('meta');
    for (let i = 0, len = ref.length; i < len; i++) {
      const meta = ref[i];
      const name = meta.getAttribute('name');
      if (names.includes(name)) {
        this[name.toUpperCase()] = meta.getAttribute('content') || meta.getAttribute('value');
      }
    }
  }
}
