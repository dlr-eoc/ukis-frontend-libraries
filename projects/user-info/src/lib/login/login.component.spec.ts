import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService, IAuthService, IUser, IUserinfo, ExampleAuthService } from '../user.service';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usrSvc: UserService;
  let authService: IAuthService;


  beforeEach(waitForAsync(() => {
    authService = new ExampleAuthService();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    TestBed.configureTestingModule({
    imports: [ClarityModule, FormsModule, ReactiveFormsModule, LoginComponent],
    providers: [{ provide: UserService, useValue: usrSvc }]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
