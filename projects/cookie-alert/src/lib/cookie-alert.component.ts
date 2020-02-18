import { Component, OnInit, Input } from '@angular/core';
import { UtilStoreService } from '@dlr-eoc/services-util-store';

@Component({
  selector: 'ukis-cookie-alert',
  templateUrl: './cookie-alert.component.html',
  styleUrls: ['./cookie-alert.component.scss']
})
export class CookieAlertComponent implements OnInit {
  alert: any;
  @Input('alert-text') text = 'By using this website you are giving your consent for us to set cookies.';
  @Input('privacy-link') link = '#/privacy';
  agree: string;

  constructor(
    private UtilStore: UtilStoreService
  ) {
    const host = document.location.host;
    this.agree = `cookie-agree-${host}`;
  }

  ngOnInit() {
    this.alert = true;
    if (this.check()) {
      this.remove();
    }
  }

  remove() {
    this.alert = false;
    this.UtilStore.local(this.agree, true);
  }

  check() {
    return this.UtilStore.local(this.agree);
  }

}
