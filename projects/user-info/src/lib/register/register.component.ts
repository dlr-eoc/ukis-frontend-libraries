import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService, UserDetails } from '../user.service';

@Component({
  selector: 'ukis-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  usrInfoForm = new FormGroup({
    usrName: new FormControl('', Validators.required),
    usrPass: new FormControl('', Validators.required),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  usrSubsription: Subscription;
  user: UserDetails;
  submitted: false;

  constructor(@Inject(UserService) private usrSvc: UserService) {
    this.usrSubsription = this.usrSvc.getUser().subscribe((user) => {
      this.user = user;
    }, (error) => {
      console.log(error);
    });
  }

  register() {
    this.usrSvc.register(
      this.usrInfoForm.get("usrName").value,
      this.usrInfoForm.get("usrPass").value,
      this.usrInfoForm.get("email").value,
      this.usrInfoForm.get("firstName").value,
      this.usrInfoForm.get("lastName").value);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }

}
