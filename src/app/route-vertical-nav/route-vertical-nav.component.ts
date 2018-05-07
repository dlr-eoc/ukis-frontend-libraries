import { Component, OnInit } from '@angular/core';
import { AlertService } from '../global-alert/alert.service';

@Component({
  selector: 'ukis-route-vertical-nav',
  templateUrl: './route-vertical-nav.component.html',
  styleUrls: ['./route-vertical-nav.component.scss'],
  providers: []
})
export class RouteVerticalNavComponent implements OnInit {


  constructor(private alertService:AlertService) {

  }

  fireAlert(ev) {
    this.alertService.alert(ev);
  }

  ngOnInit() {
  }

}
