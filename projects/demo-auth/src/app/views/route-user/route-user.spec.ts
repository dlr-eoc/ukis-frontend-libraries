import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteUser } from './route-user';
import { IAuthService, UserService } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { BasicAuthSvc } from '../../auth/basic-auth-svc';


describe('RouteUser', () => {
  let component: RouteUser;
  let fixture: ComponentFixture<RouteUser>;
  let usrSvc: UserService;
  let authService: IAuthService;

  beforeEach(async () => {
    authService = new BasicAuthSvc();
    usrSvc = new UserService();
    usrSvc.setAuthService(authService);

    await TestBed.configureTestingModule({
      imports: [RouteUser],
      providers: [{ provide: UserService, useValue: usrSvc }]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
