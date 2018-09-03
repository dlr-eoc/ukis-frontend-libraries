import { Component, OnInit } from '@angular/core';
import { AlertService, IAlert } from '../../components/global-alert/alert.service';
import { FooterService } from '../../components/global-footer/footer.service';

@Component({
  selector: 'ukis-route-vertical-nav',
  templateUrl: './route-vertical-nav.component.html',
  styleUrls: ['./route-vertical-nav.component.scss'],
  providers: []
})
export class RouteVerticalNavComponent implements OnInit {


  constructor(private alertService: AlertService,
    private footerService: FooterService) {
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
    this.footerService.show(val);
  }

  ngOnInit() {
  }

}
