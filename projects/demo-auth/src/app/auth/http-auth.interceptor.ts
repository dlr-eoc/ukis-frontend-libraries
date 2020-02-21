import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { BasicAuthService } from './basic-auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(public auth: BasicAuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = request.clone({
      // withCredentials: false,
      setHeaders: {
        Authorization: `${this.auth.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('HttpAuthInterceptor', cloneReq);
    return next.handle(cloneReq);
  }
}
