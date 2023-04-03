import { Component, OnDestroy, OnInit } from '@angular/core';

import './components/icons/ukis';

import { AlertService, IAlert } from './components/global-alert/alert.service';
import { ProgressService, IProgress } from './components/global-progress/progress.service';
import { NavigationEnd, NavigationStart, Router, Routes } from '@angular/router';
import { appVersion } from '../environments/version';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IUi {
  alert: null | IAlert;
  progress: null | IProgress;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  shortTitle = '';
  version = (appVersion) ? appVersion : null;

  ui: IUi = {
    alert: null,
    progress: null
  };

  subs: Subscription[] = [];

  routes: Routes;
  currentRoute: string;

  constructor(
    private alertService: AlertService,
    private progressService: ProgressService,
    public router: Router
  ) {
    this.init();
    this.routes = this.router.config.filter(r => r.data);
  }

  ngOnInit(): void {
    /** get current route to show in header */
    //
    const routerSub = this.router.events.pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationStart))
      .subscribe((event: NavigationEnd | NavigationStart) => {
        const url = new URL(event.url, `${window.location.origin}${window.location.pathname}`);
        if (url.pathname !== '/examples') {
          this.currentRoute = url.pathname.slice(1);
        } else {
          this.currentRoute = null;
        }
      });
    this.subs.push(routerSub);
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
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
