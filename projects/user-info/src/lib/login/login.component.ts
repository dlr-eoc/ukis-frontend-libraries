import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { UserService, IUserinfo, IUser } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ukis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  usrInfoForm = new FormGroup({
    usrName: new FormControl('', Validators.required),
    usrPass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    remember: new FormControl(false)
  }, { updateOn: 'blur' });

  usrSubsription: Subscription;
  user: IUser;
  submitted: boolean

  constructor(@Inject(UserService) public usrSvc: UserService) {
    this.usrSubsription = this.usrSvc.getUserInfo().subscribe((userinfo) => {
      this.user = userinfo.current_user;
    }, (error) => {
      console.log(error);
    });
  }

  login() {
    console.log(this.usrInfoForm)
    let user: IUser = {
      userName: this.usrInfoForm.get("usrName").value,
      password: this.usrInfoForm.get("usrPass").value,
      remember: this.usrInfoForm.get("remember").value
    }
    this.usrSvc.login(user);
  }

  getFormError(key) {
    let error = '';
    const controlErrors: ValidationErrors = this.usrInfoForm.get(key).errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach((keyError, index) => {
        let _error = keyError;
        if (keyError !== 'required') {
          _error = JSON.stringify(this.usrInfoForm.get(key).errors[keyError]);
        }
        if (index == 0) {
          error += `${_error}`
        } else {
          error += ` and ${_error}`
        }
      });
    }
    return error;
  }

  logout() {
    this.usrSvc.logout();
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }

}
