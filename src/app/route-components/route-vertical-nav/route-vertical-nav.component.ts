import { Component, OnInit } from '@angular/core';
import { AlertService, IAlert } from '../../components/global-alert/alert.service';
import { FooterService } from '../../components/global-footer/footer.service';
import { ProgressService } from 'src/app/components/global-progress/progress.service';

@Component({
  selector: 'ukis-route-vertical-nav',
  templateUrl: './route-vertical-nav.component.html',
  styleUrls: ['./route-vertical-nav.component.scss'],
  providers: [],
  host: {
    "[class.content-container]": "true"
  }
})
export class RouteVerticalNavComponent implements OnInit {
  ui: {
    footer: boolean;
  }
  constructor(private alertService: AlertService,
    private footerService: FooterService,
    private progressService: ProgressService) {
    this.ui = {
      footer: false
    }
  }

  fireAlert(ev) {
    let alert: IAlert = {
      type: ev,
      text: `<strong> This is a ${ev} alert </strong>`,
      closeable: true,
      actions: [
        {
          title: 'ACTION',
          callback: () => {
            console.log('received click');
          }
        }]
    };
    this.alertService.alert(alert);
  }

  showFooter(val) {
    this.ui.footer != this.ui.footer;
    this.footerService.show(val);
  }

  showProgress(val) {
    if (!val) {
      this.progressService.progress(null)
    } else {
      let progress = { indeterminate: true };
      this.progressService.progress(progress)
    }
  }

  ngOnInit() {
  }

  onToggle(evt) {
    console.log('Toggle has focus', evt);
  }

}
