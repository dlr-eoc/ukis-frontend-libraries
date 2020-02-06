import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, ExampleAuthService, IAuthService } from '../user.service';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usrSvc: UserService;
  let authService: IAuthService;


  beforeEach(async(() => {
    authService = new ExampleAuthService();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [{ provide: UserService, useValue: usrSvc }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
