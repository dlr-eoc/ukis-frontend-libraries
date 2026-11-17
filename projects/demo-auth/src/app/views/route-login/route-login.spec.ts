import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteLogin } from './route-login';
import { IAuthService, UserService } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { BasicAuthSvc } from '../../auth/basic-auth-svc';

describe('RouteLogin', () => {
  let component: RouteLogin;
  let fixture: ComponentFixture<RouteLogin>;
  let usrSvc: UserService;
  let authService: IAuthService;

  beforeEach(async () => {
    authService = new BasicAuthSvc();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    await TestBed.configureTestingModule({
      imports: [RouteLogin],
      providers: [{ provide: UserService, useValue: usrSvc }]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
