import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService, IAuthService, ExampleAuthService } from '../user.service';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usrSvc: UserService;
  let authService: IAuthService;


  beforeEach(async () => {
    authService = new ExampleAuthService();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    await TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule, LoginComponent],
      providers: [{ provide: UserService, useValue: usrSvc }]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
