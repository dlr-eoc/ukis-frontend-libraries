import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { UserService, IAuthService, ExampleAuthService } from '../user.service';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let usrSvc: UserService;
  let authService: IAuthService;


  beforeEach(waitForAsync(() => {
    authService = new ExampleAuthService();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [UserDetailsComponent],
      providers: [{ provide: UserService, useValue: usrSvc }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
