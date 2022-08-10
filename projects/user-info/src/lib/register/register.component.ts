import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService, IRegisterUser, IUser } from '../user.service';

interface IusrInfoForm {
  usrName: FormControl<string>;
  usrPass: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
}
@Component({
  selector: 'ukis-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  usrInfoFormOptions: IusrInfoForm;
  usrInfoForm: FormGroup<IusrInfoForm>;

  usrSubsription: Subscription;
  user: IUser;
  submitted: false;

  constructor(private usrSvc: UserService) {
    this.usrInfoFormOptions = {
      usrName: new FormControl('', Validators.required),
      usrPass: new FormControl('', [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
    };
    this.usrInfoForm = new FormGroup<IusrInfoForm>(this.usrInfoFormOptions);

    this.usrSubsription = this.usrSvc.getUserInfo().subscribe((userinfo) => {
      this.user = userinfo.current_user;
    }, (error) => {
      console.log(error);
    });
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

  register() {
    const user: IRegisterUser = {
      userName: this.usrInfoForm.get('usrName').value,
      password: this.usrInfoForm.get('usrPass').value,
      email: this.usrInfoForm.get('email').value,
      firstName: this.usrInfoForm.get('firstName').value,
      lastName: this.usrInfoForm.get('lastName').value
    };
    this.usrSvc.register(user);
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }

}
