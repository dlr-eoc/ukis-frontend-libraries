import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new BehaviorSubject(new UserDetails());

  constructor(public http: HttpClient) {
    let user = new UserDetails();
    user.loggedIn = false;
    this.user.next(user);
    this.mockCheckAuthentication(user);
  }

  getUser(): Observable<UserDetails> {
    return this.user.asObservable();
  }

  setUser(user: UserDetails) {
    this.user.next(user);
  }

  setLoginError(error: String) {
    this.user.error(error);
  }

  removeUser() {
    this.user = null;
  }

  sessionRestore() {
    console.log('TODO: inject Service to handle sessionRestore');
    //this.authService.checkLogin();
  }

  /**
   * 
   * Basic Login with name and password
   */
  login(username: string, password: string, remember: boolean) {
    console.log('TODO: inject Service to handle login');
    this.mockLoginService(username, password);
    //this.authService.login(username, password, remember);
  }

  /**
   * 
   */
  logout() {
    console.log('TODO: inject Service to handle logout');
    //this.authService.logout();
    this.mockLogoutService()
  }


  /**
  * Register user on Backend
  */
  register(username: string, password: string, email: string, firstName?: string, lastName?: string) {
    console.log('TODO: inject Service to handle register');
    this.mockLoginService(username, password, email, firstName, lastName);
  }

  //TODO: only abstract implemented
  getUserInfo(url: string) {
    return this.http.get(url).pipe(map((response: any) => response));

  }

  //TODO: only abstract implemented
  checkAuthorization(permissions: string[], _user?: UserDetails) {
    let user = this.user.getValue()
    if (_user) {
      user = _user;
    }
    let boolPermissions = permissions.map((p) => user.permissions.includes(p))
    if (boolPermissions.includes(false)) {
      return false;
    } else {
      return true;
    }
  }

  //TODO: only abstract implemented
  checkAuthentication(_user?: UserDetails) {
    let user = this.user.getValue()
    if (_user) {
      user = _user;
    }
    if (user.loggedIn) {
      return true;
    }
  }

  mockCheckAuthentication(_user?: UserDetails) {
    if (_user && this.mockCheckUser()) {
      _user.loggedIn = true;
      _user.userName = this.mockCheckUser()
      this.user.next(_user);
    }
  }

  mockLoginService(username: string, password?: string, email?: string, firstName?: string, lastName?: string) {
    let user = new UserDetails();
    user.userName = username;
    user.password = password;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.loggedIn = true;
    this.setUser(user);
    window.localStorage.setItem('mock-user', username);
  }

  mockLogoutService() {
    let user = new UserDetails();
    user.loggedIn = false;
    this.setUser(user);
    window.localStorage.removeItem('mock-user');
  }

  mockCheckUser() {
    return window.localStorage.getItem('mock-user')
  }

}

export class UserDetails {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userID: string;
  loggedIn: boolean = false;
  restored: boolean = false;
  permissions: Array<string>;
  constructor() {

  }
}
