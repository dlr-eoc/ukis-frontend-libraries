import { Component } from '@angular/core';


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

@Component({
  selector: 'ukis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class UkisComponent {
  title = 'Master';

  ui = {
    floating: true,
    flipped: false,
    footer: false,
    alert: null,
    progress: null
  };

  constructor(
    private footerService: FooterService,
    private alertService: AlertService,
    private progressService: ProgressService
  ) {
    this.getHtmlMeta(['title', 'version', 'description']);

    if (this['TITLE']) {
      this.title = this['TITLE'];
    }

    alertService.alert$.subscribe((ev) => {
      this.setAlert(ev)
    });

    footerService.footer$.subscribe((ev) => {
      this.showFooter(ev)
    });

    progressService.progress$.subscribe((ev) => {
      this.showProgress(ev)
    })
  }

  showProgress = (progress: IProgress) => {
    this.ui.progress = progress;
  }

  showFooter = (show: boolean) => {
    console.log('show')
    this.ui.footer = show;
  }

  setAlert = (alert: IAlert) => {
    // structure of (app-level) alert
    /*
    this.alert = {
      type: type || 'info',
      text: `<strong></strong>`,
      closeable: true,
      actions: [
        {
          title: 'ACTION',
          callback: () => {
            console.log('received click');
          }
        }]
    };
    */
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
}
