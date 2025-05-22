import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';


@Component({
    selector: 'ukis-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
    imports: []
})
export class UserDetailsComponent implements OnDestroy {

  usrSubsription: Subscription;
  user: any; // IUser; //angular language service error: https://github.com/angular/angular/issues/17953

  constructor(public usrSvc: UserService) {
    this.usrSubsription = this.usrSvc.getUserInfo().subscribe((userinfo) => {
      this.user = userinfo.current_user;
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    this.usrSvc.logout();
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }
}
