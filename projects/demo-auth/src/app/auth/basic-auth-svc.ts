import { Service } from "@angular/core";
import { IBasicUser, IUserinfo } from "@dlr-eoc/ngx-ukis-ui-clarity";
import { BehaviorSubject, Observable } from "rxjs";

export class Auth {
    userName: string = "";
    isAuthenticated: boolean = false;
    firstName?: string;
    lastName?: string;
    email?: string;
}

@Service()
export class BasicAuthSvc {
    private userinfo = new BehaviorSubject({ current_user: {} } as IUserinfo);
    // private token: string;
    loginmethode!: "oauth_pass"; // loginmethode: 'oauth_pass' | 'oauth_code' | 'ukis_cas';
    private tokenType = "Basic";
    private token!: string;

    login(user: IBasicUser) {
        const userinfo: IUserinfo = {
            current_user: user,
            urls: null,
        };
        this.token = this.createToken(user.userName, user.password);
        /**
         * this should normally come from a backend
         */
        userinfo.current_user.loggedIn = true;
        userinfo.current_user.permissions = ["can_view_user", "can_view_map"];

        if (user.remember) {
            this.setBrowserSession(user);
        }

        this.userinfo.next(userinfo);
        return this.userinfo.asObservable();
    }

    logout() {
        const userinfo = this.userinfo.getValue();
        userinfo.current_user = null as never;
        this.userinfo.next(userinfo);
        this.removeBrowserSession();
        return this.userinfo.asObservable();
    }

    getUserInfo(): Observable<IUserinfo> {
        return this.userinfo.asObservable();
    }

    isloggedIn(): boolean {
        const user = this.userinfo.getValue().current_user;
        if (user && user.loggedIn) {
            return true;
        } else {
            return false;
        }
    }

    checkAuthorization(permissions: string[]): Observable<boolean> {
        const user = this.userinfo.getValue().current_user;
        if (user && Array.isArray(user.permissions)) {
            // let boolPermissions = permissions.map((p) => user.permissions.includes(p))
            const boolPermissions = permissions.map((p) =>
                user.permissions?.includes(p)
            );
            if (boolPermissions.includes(false)) {
                return new BehaviorSubject(false).asObservable();
            } else {
                return new BehaviorSubject(true).asObservable();
            }
        }else{
            return new BehaviorSubject(false).asObservable();
        }
    }

    checkSession() {
        return this.checkBrowserSession();
    }

    // custem functions for the Basic Auth service
    mockGetUserinfo() {
    }

    setBrowserSession(user: IBasicUser) {
        window.localStorage.setItem("UN", user.userName);
        if (user.permissions) {
            window.localStorage.setItem("PE", user.permissions?.join(";"));
        }
        window.localStorage.setItem("ST", this.getBasicCode());
        window.localStorage.setItem("RM", "true");
    }

    removeBrowserSession() {
        window.localStorage.removeItem("UN");
        window.localStorage.removeItem("ST");
        window.localStorage.removeItem("PE");
        window.localStorage.removeItem("RM");
    }

    checkBrowserSession() {
        if (
            window.localStorage.getItem("RM") &&
            window.localStorage.getItem("RM") === "true"
        ) {
            const code = window.localStorage.getItem("ST");
            const userName = window.localStorage.getItem("UN");
            if (code && userName) {
                this.setBasicCode(code);

                const userinfo: IUserinfo = {
                    current_user: {
                        userName,
                        password: this.decodeToken(code),
                    },
                    urls: null,
                };
                // let userName = window.localStorage.getItem("UN");
                const permissions = window.localStorage.getItem("PE");
                userinfo.current_user.loggedIn = true;
                if (permissions) {
                    userinfo.current_user.permissions = permissions.split(";");
                }
                console.log(userinfo);
                this.userinfo.next(userinfo);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getToken(): string {
        return this.token;
    }

    getBasicCode(): string {
        // trim to remove space
        const code = this.token.split(this.tokenType)[1].trim();
        return code;
    }

    setBasicCode(code: string) {
        this.token = `${this.tokenType} ${code}`;
    }

    setToken(token: string) {
        this.token = token;
    }

    createToken(username: string, password: string) {
        const basicCode = btoa(`${username}:${password}`);
        return `${this.tokenType} ${basicCode}`;
    }

    decodeToken(token: string): string {
        let code = token.split(this.tokenType)[1];
        if (code) {
            code = code.trim();
        } else {
            code = token;
        }
        return atob(code);
    }
}
