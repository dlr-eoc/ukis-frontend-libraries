import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, ExampleAuthService, IAuthService } from '../user-svc';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usrSvc: UserService;
  let authService: IAuthService;


  beforeEach(async () => {
    authService = new ExampleAuthService();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    await TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule, RegisterComponent],
      providers: [{ provide: UserService, useValue: usrSvc }]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});