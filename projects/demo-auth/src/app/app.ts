import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, WritableSignal, signal, inject } from '@angular/core';

import { AlertService, IAlert } from './components/global-alert/global-alert-svc';
import { ProgressService, IProgress } from './components/global-progress/global-progress-svc';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/** for User */
import { Subscription } from 'rxjs';
import { UserService, IUser } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { CookieAlertComponent } from '@dlr-eoc/cookie-alert';
import { BasicAuthService } from './auth/basic-auth.service';
import { ClrMainContainerModule, ClrNavigationModule } from '@clr/angular';

import { GlobalAlertComponent } from './components/global-alert/global-alert';
import { GlobalProgressComponent } from './components/global-progress/global-progress';
import { HeaderComponent } from './components/header/header.component';

interface IUi {
  alert: WritableSignal<null | IAlert>;
  progress: WritableSignal<null | IProgress>;
}

@Component({
    selector: 'app-root',
    imports: [ClrMainContainerModule, ClrNavigationModule, GlobalAlertComponent, GlobalProgressComponent, HeaderComponent, RouterLink, RouterLinkActive, RouterOutlet, CookieAlertComponent],
    templateUrl: './app.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.scss'
})
export class App implements OnDestroy, OnInit {
  title = '';
  shortTitle = '';

  ui: IUi = {
    alert: signal<IAlert | null>(null),
    progress: signal<IProgress | null>(null)
  };

  usrSubsription!: Subscription;
  user!: IUser;

  public alertService = inject(AlertService);
  public progressService = inject(ProgressService);
  public router = inject(Router);
  public userService = inject(UserService);
  public authService = inject(BasicAuthService);
  constructor() {
    this.init();
    this.ui.alert = this.alertService.alert;
    this.ui.progress = this.progressService.progress;
  }

  init() {
    this.userService.setAuthService(this.authService as never);
    this.authService.checkSession();

    this.getHtmlMeta(['title', 'version', 'description', 'short-title']);

    if (this['TITLE']) {
      this.title = this['TITLE'];
    }

    if (this['SHORT-TITLE']) {
      this.shortTitle = this['SHORT-TITLE'];
    }
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

  ngOnInit() {
    this.usrSubsription = this.userService.getUserInfo().subscribe(userinfo => {
      console.log('userinfo in app component', userinfo);
      this.user = userinfo.current_user;
      if (userinfo.current_user && userinfo.current_user.loggedIn) {
        // router.navigate not working with routerLinkActive - css
        document.location.hash = '/map';
      } else {
        document.location.hash = '/login';
        // window.localStorage.removeItem('GetFeature');
      }
    });
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }
}
