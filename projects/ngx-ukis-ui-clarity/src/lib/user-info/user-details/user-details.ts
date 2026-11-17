import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user-svc';


@Component({
  selector: 'ngx-ukis-user-details',
  styleUrl: './user-details.scss',
  templateUrl: './user-details.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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

