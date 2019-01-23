import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails, UserService } from '../user.service';

@Component({
  selector: 'ukis-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  usrSubsription: Subscription;
  user: UserDetails;

  constructor(@Inject(UserService) public usrSvc: UserService) {
    this.usrSubsription = this.usrSvc.getUser().subscribe((user) => {
      console.log(user)
      this.user = user;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {

  }

  logout() {
    this.usrSvc.logout()
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }

}
