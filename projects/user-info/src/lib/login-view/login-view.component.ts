import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { UserService, UserDetails } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ukis-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit, OnDestroy {
  @Input('withRegisterForm') withRegisterForm: boolean;

  usrSubsription: Subscription;
  login: boolean;
  register: boolean;
  user: UserDetails;

  constructor(@Inject(UserService) private usrSvc: UserService) {
    this.login = true;
    this.usrSubsription = this.usrSvc.getUser().subscribe(_user => {
      this.user = _user;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }

  loginRegister(type: 'login' | 'register') {
    if (type === 'login') {
      this.register = false;
      this.login = true;
    } else {
      this.login = false;
      this.register = true;
    }
  }

}
