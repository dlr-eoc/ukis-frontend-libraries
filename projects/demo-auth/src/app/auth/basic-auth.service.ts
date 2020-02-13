import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IUserinfo, IAuthService, IBasicUser } from '@ukis/user-info'

export class Auth {
    userName: string;
    isAuthenticated: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
}

/**
 * http://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example#auth-guard-ts
 */
@Injectable()
export class BasicAuthService implements IAuthService {
    private userinfo = new BehaviorSubject(<IUserinfo>{ current_user: {} });
    //private token: string;
    loginmethode: 'oauth_pass' //loginmethode: 'oauth_pass' | 'oauth_code' | 'ukis_cas';
    private tokenType: string = 'Basic';
    private token: string = null;

    constructor(private http: HttpClient) {

    }


    login(user: IBasicUser) {
        let userinfo: IUserinfo = {
            current_user: user,
            urls: null
        }
        this.token = this.createToken(user.userName, user.password);
        /** 
         * this should normally come from a backend 
         */
        userinfo.current_user.loggedIn = true;
        userinfo.current_user.permissions = ['can_view_user', 'can_view_map'];

        if (user.remember) {
            this.setBrowserSession(user);
        }

        this.userinfo.next(userinfo);
        return this.userinfo.asObservable();
    }

    logout() {
        let userinfo = this.userinfo.getValue();
        userinfo.current_user = null;
        this.userinfo.next(userinfo);
        this.removeBrowserSession()
        return this.userinfo.asObservable();
    }

    getUserInfo(): Observable<IUserinfo> {
        return this.userinfo.asObservable();
    }

    isloggedIn(): boolean {
        let user = this.userinfo.getValue().current_user;
        if (user && user.loggedIn) {
            return true;
        } else {
            return false;
        }
    }

    checkAuthorization(permissions: string[]): Observable<boolean> {
        let user = this.userinfo.getValue().current_user;
        if (user && Array.isArray(user.permissions)) {
            //let boolPermissions = permissions.map((p) => user.permissions.includes(p))
            let boolPermissions = permissions.map((p) => user.permissions.includes(p))
            if (boolPermissions.includes(false)) {
                return new BehaviorSubject(false).asObservable();
            } else {
                return new BehaviorSubject(true).asObservable();
            }
        }
    }

    checkSession() {
        this.checkBrowserSession();
    }


    // custem functions for the Basic Auth service
    mockGetUserinfo() {

    }

    setBrowserSession(user: IBasicUser) {
        window.localStorage.setItem("UN", user.userName);
        window.localStorage.setItem("PE", user.permissions.join(';'));
        window.localStorage.setItem("ST", this.getBasicCode())
        window.localStorage.setItem("RM", "true")
    }

    removeBrowserSession() {
        window.localStorage.removeItem("UN");
        window.localStorage.removeItem("ST");
        window.localStorage.removeItem("PE");
        window.localStorage.removeItem("RM");
    }

    checkBrowserSession() {
        if (window.localStorage.getItem("RM") && window.localStorage.getItem("RM") === "true") {
            let code = window.localStorage.getItem("ST")
            let userName = window.localStorage.getItem("UN");
            this.setBasicCode(code);

            let userinfo: IUserinfo = {
                current_user: {
                    userName: userName,
                    password: this.decodeToken(code)
                },
                urls: null
            }
            //let userName = window.localStorage.getItem("UN");
            let permissions = window.localStorage.getItem("PE")
            userinfo.current_user.loggedIn = true;
            if (permissions) {
                userinfo.current_user.permissions = permissions.split(';');
            }
            console.log(userinfo)
            this.userinfo.next(userinfo);
        }
    }

    getToken(): string {
        return this.token;
    }

    getBasicCode(): string {
        //trim to remove space
        let code = this.token.split(this.tokenType)[1].trim();
        return code;
    }

    setBasicCode(code: string) {
        this.token = `${this.tokenType} ${code}`;
    }

    setToken(token: string) {
        this.token = token
    }

    createToken(username: string, password: string) {
        var basicCode = btoa(`${username}:${password}`);
        return `${this.tokenType} ${basicCode}`;
    }

    decodeToken(token: string): string {
        let _code = token.split(this.tokenType)[1]
        if (_code) {
            _code = _code.trim();
        } else {
            _code = token;
        }
        return atob(_code);
    }

}