import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { ClrMainContainerModule, ClrNavigationModule } from '@clr/angular';
import { GlobalAlertComponent } from './components/global-alert/global-alert';
import { GlobalProgressComponent } from './components/global-progress/global-progress';
import { HeaderComponent } from './components/header/header';
import { AlertService, IAlert } from './components/global-alert/global-alert-svc';
import { IProgress, ProgressService } from './components/global-progress/global-progress-svc';
import { appVersion } from '../environments/version';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IUi {
  alert: WritableSignal<null | IAlert>;
  progress: WritableSignal<null | IProgress>;
}

@Component({
  imports: [ClrMainContainerModule, ClrNavigationModule, GlobalAlertComponent, GlobalProgressComponent, HeaderComponent, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  title = signal('');
  shortTitle = signal('');
  version = (appVersion) ? appVersion : '';

  ui: IUi = {
    alert: signal<IAlert | null>(null),
    progress: signal<IProgress | null>(null)
  };

  subs: Subscription[] = [];

  protected readonly routes = routes;

  currentRoute!: string | null;

  private alertService = inject(AlertService);
  private progressService = inject(ProgressService);
  public router = inject(Router);
  constructor() {
    this.init();
    this.ui.alert = this.alertService.alert;
    this.ui.progress = this.progressService.progress;

    // old ngOnInit()
    const effectRef = effect(() => {
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
      effectRef.destroy();
    }, { manualCleanup: true });
  }

  init() {
    this.getHtmlMeta(['title', 'version', 'description', 'short-title']);

    if ((this as never)['TITLE']) {
      this.title.set((this as never)['TITLE']);
    }
    if ((this as never)['SHORT-TITLE']) {
      this.shortTitle.set((this as never)['SHORT-TITLE']);
    }
  }

  getHtmlMeta(names: string[]) {
    const ref = document.getElementsByTagName('meta');
    for (let i = 0, len = ref.length; i < len; i++) {
      const meta = ref[i];
      const name = meta.getAttribute('name');
      if (name && names.includes(name)) {
        (this as any)[name.toUpperCase()] = meta.getAttribute('content') || meta.getAttribute('value');
      }
    }
  }
}
