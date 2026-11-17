import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details';
import { UserService, IAuthService, ExampleAuthService } from '../user-svc';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let usrSvc: UserService;
  let authService: IAuthService;

  beforeEach(async () => {
    authService = new ExampleAuthService();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    await TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule, UserDetailsComponent],
      providers: [{ provide: UserService, useValue: usrSvc }]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
