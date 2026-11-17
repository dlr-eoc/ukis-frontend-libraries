import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { UtilStoreService } from '@dlr-eoc/services-util-store';

@Component({
  imports: [NgClass],
  selector: 'ngx-ukis-cookie-alert',
  styleUrl: './cookie-alert.scss',
  templateUrl: './cookie-alert.html',
})
export class CookieAlertComponent {
  alert = signal<boolean>(true);
  public text = input('By using this website you are giving your consent for us to set cookies.'); // @Input('alert-text') text = 'By using this website you are giving your consent for us to set cookies.';
  public link = input('#/privacy');// @Input('privacy-link') link = '#/privacy';
  public textPolicy = input('Privacy Policy');
  public textBtn = input('OK, I agree');
  private agree: string;

  private UtilStore = inject(UtilStoreService);
  constructor() {
    const host = document.location.host;
    this.agree = `cookie-agree-${host}`;
  }

  ngOnInit() {
    if (this.check()) {
      this.remove();
    }
  }

  remove() {
    this.alert.set(false);
    this.UtilStore.local(this.agree, true);
  }

  check() {
    return this.UtilStore.local(this.agree);
  }
}
