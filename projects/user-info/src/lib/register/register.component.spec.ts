import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, ExampleAuthService, IAuthService } from '../user.service';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usrSvc: UserService;
  let authService: IAuthService;


  beforeEach(waitForAsync(() => {
    authService = new ExampleAuthService();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    TestBed.configureTestingModule({
    imports: [ClarityModule, FormsModule, ReactiveFormsModule, RegisterComponent],
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
