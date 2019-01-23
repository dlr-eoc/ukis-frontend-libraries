import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, UserDetails } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ukis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  usrInfoForm = new FormGroup({
    usrName: new FormControl('', Validators.required),
    usrPass: new FormControl('', Validators.required),
    remember: new FormControl(true)
  });

  usrSubsription: Subscription;
  user: UserDetails;
  submitted:boolean

  constructor(@Inject(UserService) public usrSvc: UserService) {
    this.usrSubsription = this.usrSvc.getUser().subscribe((user) => {
      this.user = user;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.usrSubsription.unsubscribe();
  }

  login() {
    console.log(this.usrSvc)
    this.usrSvc.login(this.usrInfoForm.get("usrName").value, this.usrInfoForm.get("usrPass").value, this.usrInfoForm.get("remember").value);
  }

  logout() {
    this.usrSvc.logout()
  }

}
