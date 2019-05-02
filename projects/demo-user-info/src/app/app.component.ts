import { Component, OnDestroy, OnInit } from '@angular/core';


import '@webcomponents/custom-elements';
import '@clr/icons/shapes/all-shapes';
import '@clr/icons/shapes/commerce-shapes';
import '@clr/icons/shapes/core-shapes';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/media-shapes';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/technology-shapes';
import '@clr/icons/shapes/travel-shapes';
import './components/icons/ukis';

import { AlertService, IAlert } from './components/global-alert/alert.service';
import { FooterService } from './components/global-footer/footer.service';
import { ProgressService, IProgress } from './components/global-progress/progress.service';

/** for User */
import { Subscription, isObservable } from 'rxjs';
import { UserService, IUser } from '@ukis/user-info';
import { BasicAuthService } from './auth/basic-auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ukis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class UkisComponent implements OnDestroy, OnInit {
  title = 'Master';

  ui = {
    floating: true,
    flipped: false,
    footer: false,
    alert: null,
    progress: null
  };

  usrSubsription: Subscription;
  user: IUser;

  constructor(
    private footerService: FooterService,
    private alertService: AlertService,
    private progressService: ProgressService,
    private userService: UserService,
    private authService: BasicAuthService
  ) {
    this.userService.setAuthService(this.authService);
    this.authService.checkSession();


    this.getHtmlMeta(['title', 'version', 'description']);

    if (this['TITLE']) {
      this.title = this['TITLE'];
    }

    this.alertService.alert$.subscribe((ev) => {
      this.setAlert(ev)
    });

    this.footerService.footer$.subscribe((ev) => {
      this.showFooter(ev)
    });

    this.progressService.progress$.subscribe((ev) => {
      this.showProgress(ev)
    })
  }

  showProgress = (progress: IProgress) => {
    this.ui.progress = progress;
  }

  showFooter = (show: boolean) => {
    this.ui.footer = show;
  }

  setAlert = (alert: IAlert) => {
    this.ui.alert = alert;
  }

  getHtmlMeta(names: string[]) {
    var _ref = document.getElementsByTagName('meta');
    for (let _i = 0, _len = _ref.length; _i < _len; _i++) {
      let meta = _ref[_i];
      let name = meta.getAttribute('name');
      if (names.includes(name)) {
        this[name.toUpperCase()] = meta.getAttribute('content') || eval(meta.getAttribute('value'));
      }
    }
  }

  ngOnInit() {
    this.usrSubsription = this.userService.getUserInfo().subscribe(userinfo => {
      console.log('userinfo in app component', userinfo)
      this.user = userinfo.current_user;
      if (userinfo.current_user && userinfo.current_user.loggedIn) {
        //router.navigate not working with routerLinkActive - css
        document.location.hash = '/map';
      } else {
        document.location.hash = '/login';
        //window.localStorage.removeItem('GetFeature');
      }
    });
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }
}
