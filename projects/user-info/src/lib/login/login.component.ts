import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, IUserinfo, IUser } from '../user.service';
import { Subscription } from 'rxjs';
import { ClrInputModule, ClrCommonFormsModule, ClrPasswordModule, ClrCheckboxModule } from '@clr/angular';

interface IusrInfoForm {
  usrName: FormControl<string>;
  usrPass: FormControl<string>;
  remember: FormControl<boolean>;
}
@Component({
    selector: 'ukis-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrPasswordModule, ClrCheckboxModule]
})
export class LoginComponent implements OnDestroy {
  public usrInfoFormOptions: IusrInfoForm;
  public usrInfoForm: FormGroup<IusrInfoForm>;

  usrSubsription: Subscription;
  user: IUser;
  submitted: boolean;

  constructor(public usrSvc: UserService) {
    this.usrInfoFormOptions = {
      usrName: new FormControl('', Validators.required),
      usrPass: new FormControl('', [Validators.required, Validators.minLength(4)]),
      remember: new FormControl(false)
    };
    this.usrInfoForm = new FormGroup<IusrInfoForm>(this.usrInfoFormOptions, { updateOn: 'blur' });

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
