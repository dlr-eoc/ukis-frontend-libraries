import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IUrls {
  login: string;
  logout: string;
  register: string;
}

export interface IRegisterUser {
  userName: string | null | undefined;
  password: string | null | undefined
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface IUserDetails {
  userID?: string;
  loggedIn?: boolean;
  isAuthorized?: boolean;
  remember?: boolean;
  permissions?: Array<string>;
  firstName?: string;
  lastName?: string;
  email?: string;
}

/** oauth_pass */
export interface IBasicUser extends IUserDetails {
  userName: string;
  password: string;
}

/** oauth_code */
export interface ITokenUser extends IUserDetails {
  token: string;
}

export type IUser = IBasicUser | ITokenUser;

export interface IUserinfo {
  current_user: IUser;
  urls: IUrls | null;
}

export interface IAuthService {
  loginmethode: 'oauth_pass' | 'oauth_code' | 'ukis_cas';
  login(user: IUser): Observable<IUserinfo>;
  logout(user?: IUser): Observable<IUserinfo>;
  getUserInfo(user?: IUser): Observable<IUserinfo>;
  /** confirming the user is logged in and valid  */
  isloggedIn(): boolean;
  /** check if the user has access rights/privilege */
  checkSession?: () => boolean;
  checkAuthorization?(permissions: string[], user?: IUser): Observable<boolean>;
  // register?(user: IRegisterUser): Observable<IUserinfo>;
}

export class ExampleAuthService implements IAuthService {
  exampleUserInfo: IUserinfo = {
    current_user: {
      userName: 'name',
      password: 'pass'
    },
    urls: {
      login: 'https://example/login',
      logout: 'https://example/logout',
      register: 'https://example/register'
    }
  };

  loginmethode: IAuthService['loginmethode'] = 'oauth_pass';
  login = (user: IUser) => of<IUserinfo>(this.exampleUserInfo);
  logout = (user?: IUser) => of<IUserinfo>(this.exampleUserInfo);
  getUserInfo = (user?: IUser) => of<IUserinfo>(this.exampleUserInfo);
  isloggedIn = () => true;
}



@Service()
export class UserService implements IAuthService {
  private authService!: IAuthService;
  loginmethode!: IAuthService['loginmethode']
  constructor() { }

  getUserInfo(user?: IUser) {
    return this.authService.getUserInfo(user);
  }

  login(user: IUser) {
    return this.authService.login(user);
  }

  isloggedIn() {
    return this.authService.isloggedIn();
  }

  logout(user?: IUser) {
    return this.authService.logout();
  }

  register(user: IRegisterUser) {
    console.log('TODO: inject Service to handle register');
    // this.mockLoginService(username, password, email, firstName, lastName);
  }

  setAuthService(authService: IAuthService) {
    this.authService = authService;
  }

}
