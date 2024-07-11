import { Component, OnDestroy, OnInit } from '@angular/core';

import '@cds/core/icon/register.js';

import { AlertService, IAlert } from './components/global-alert/alert.service';
import { ProgressService, IProgress } from './components/global-progress/progress.service';
import { Router } from '@angular/router';

/** for User */
import { Subscription } from 'rxjs';
import { UserService, IUser } from '@dlr-eoc/user-info';
import { BasicAuthService } from './auth/basic-auth.service';

interface IUi {
  alert: null | IAlert;
  progress: null | IProgress;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = '';
  shortTitle = '';

  ui: IUi = {
    alert: null,
    progress: null
  };

  usrSubsription: Subscription;
  user: IUser;

  constructor(
    public alertService: AlertService,
    public  progressService: ProgressService,
    public router: Router,
    public userService: UserService,
    public  authService: BasicAuthService
  ) {
    this.init();
  }

  init() {
    this.userService.setAuthService(this.authService);
    this.authService.checkSession();

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
