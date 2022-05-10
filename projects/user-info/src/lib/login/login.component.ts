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
  usrInfoFormOptions = {
    usrName: new FormControl('', Validators.required),
    usrPass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    remember: new FormControl(false)
  };
  usrInfoForm = new FormGroup(this.usrInfoFormOptions, { updateOn: 'blur' });

  usrSubsription: Subscription;
  user: IUser;
  submitted: boolean;

  constructor(public usrSvc: UserService) {
    this.usrSubsription = this.usrSvc.getUserInfo().subscribe((userinfo) => {
      this.user = userinfo.current_user;
    }, (error) => {
      console.log(error);
    });
  }

  login() {
    const user: IUser = {
      userName: this.usrInfoForm.get('usrName').value,
      password: this.usrInfoForm.get('usrPass').value,
      remember: this.usrInfoForm.get('remember').value
    };
    this.usrSvc.login(user);
  }

  getFormError(key) {
    let error = '';
    const controlErrors: ValidationErrors = this.usrInfoForm.get(key).errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach((keyError, index) => {
        let newError = keyError;
        if (keyError !== 'required') {
          newError = JSON.stringify(this.usrInfoForm.get(key).errors[keyError]);
        }
        if (index === 0) {
          error += `${newError}`;
        } else {
          error += ` and ${newError}`;
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
