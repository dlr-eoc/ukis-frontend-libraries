import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [UserService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have one oth the loginmethodes', () => {
    service.loginmethode = 'oauth_code';
    expect(service.loginmethode).toBe('oauth_code');
  });

  it('should have a getUserInfo Methode', () => {
    expect(typeof service.getUserInfo).toBe('function');
  });

  it('should have a login Methode', () => {
    expect(typeof service.login).toBe('function');
  });

  it('should have a isloggedIn Methode', () => {
    expect(typeof service.isloggedIn).toBe('function');
  });

  it('should have a logout Methode', () => {
    expect(typeof service.logout).toBe('function');
  });

  it('should have a setAuthService Methode', () => {
    expect(typeof service.setAuthService).toBe('function');
  });
});
