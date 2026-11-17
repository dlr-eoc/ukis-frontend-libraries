import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService, IRegisterUser, IUser } from '../user-svc';
import { ClrInputModule, ClrCommonFormsModule, ClrPasswordModule } from '@clr/angular';

interface IusrInfoForm {
  usrName: FormControl<string | null>;
  usrPass: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
}
@Component({
  selector: 'ngx-ukis-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrPasswordModule]
})
export class RegisterComponent implements OnDestroy {
  usrInfoFormOptions: IusrInfoForm;
  usrInfoForm: FormGroup<IusrInfoForm>;

  usrSubsription: Subscription;
  user!: IUser;
  submitted!: false;

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

  getFormError(key: keyof IusrInfoForm) {
    let error = '';
    const controlErrors = this.usrInfoForm.get(key)?.errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach((keyError, index) => {
        let newError = keyError;
        if (keyError !== 'required') {
          newError = JSON.stringify(controlErrors[keyError]);
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
      userName: this.usrInfoForm.get('usrName')?.value,
      password: this.usrInfoForm.get('usrPass')?.value,
      email: this.usrInfoForm.get('email')?.value,
      firstName: this.usrInfoForm.get('firstName')?.value,
      lastName: this.usrInfoForm.get('lastName')?.value
    };
    this.usrSvc.register(user);
  }

  ngOnDestroy() {
    this.usrSubsription.unsubscribe();
  }

}

