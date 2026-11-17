import { Component, DestroyRef, effect, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IProgress, ProgressService } from './components/global-progress/global-progress-svc';
import { AlertService, IAlert } from './components/global-alert/global-alert-svc';
import { appVersion } from '../environments/version';
import { filter, Subscription } from 'rxjs';
import { routes } from './app.routes';
import { IUser, UserService } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { BasicAuthSvc } from './auth/basic-auth-svc';
import { ClrMainContainerModule, ClrNavigationModule } from '@clr/angular';
import { GlobalAlertComponent } from './components/global-alert/global-alert';
import { GlobalProgressComponent } from './components/global-progress/global-progress';
import { HeaderComponent } from './components/header/header';
import { CookieAlertComponent } from '@dlr-eoc/cookie-alert';

interface IUi {
  alert: WritableSignal<null | IAlert>;
  progress: WritableSignal<null | IProgress>;
}

@Component({
  imports: [ClrMainContainerModule, ClrNavigationModule, GlobalAlertComponent, GlobalProgressComponent, HeaderComponent, RouterLink, RouterLinkActive, RouterOutlet, CookieAlertComponent],
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
  user = signal<IUser | null>(null);

  protected readonly routes = routes;

  currentRoute = signal<string | null>(null);

  private alertService = inject(AlertService);
  private progressService = inject(ProgressService);
  public router = inject(Router);
  public userService = inject(UserService);
  public authService = inject(BasicAuthSvc);
  private destroyRef = inject(DestroyRef);
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
            this.currentRoute.set(url.pathname.slice(1));
          } else {
            this.currentRoute.set(null);
          }
        });
      this.subs.push(routerSub);


      this.userService.setAuthService(this.authService as never);
      this.authService.checkSession();

      const usrSubsription = this.userService.getUserInfo().subscribe(userinfo => {
        console.log('userinfo in app component', userinfo);
        this.user.set(userinfo.current_user);
        if (userinfo.current_user && userinfo.current_user.loggedIn) {
          this.router.navigate(['map']);
        } else {
          this.router.navigate(['login']);
        }
      });
      this.subs.push(usrSubsription);


      effectRef.destroy();
    });

    this.destroyRef.onDestroy(() => {
      this.subs.forEach(s => s.unsubscribe())
    });
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
