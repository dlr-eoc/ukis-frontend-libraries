import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, IUser } from '../user.service';

@Component({
  selector: 'ukis-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnDestroy {

  usrSubsription: Subscription;
  user: IUser;

  constructor(@Inject(UserService) public usrSvc: UserService) {
    this.usrSubsription = this.usrSvc.getUserInfo().subscribe((userinfo) => {
      this.user = userinfo.current_user;
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    this.usrSvc.logout()
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }
}
