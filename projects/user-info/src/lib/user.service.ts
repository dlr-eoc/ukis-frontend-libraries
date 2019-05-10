import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface IUrls {
  login: string;
  logout: string;
  register: string;
}

export interface IRegisterUser {
  userName: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
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
  checkSession?();
  checkAuthorization?(permissions: string[], user?: IUser): Observable<boolean>;
  register?(user: IRegisterUser): Observable<IUserinfo>;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authService: IAuthService;

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

  setAuthService(authService) {
    this.authService = authService;
  }

}
