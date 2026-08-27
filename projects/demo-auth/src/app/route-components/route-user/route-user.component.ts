import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { UserDetailsComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';

@Component({
    selector: 'app-route-user',
    templateUrl: './route-user.component.html',
    styleUrls: ['./route-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [UserDetailsComponent]
})
export class RouteUserComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
