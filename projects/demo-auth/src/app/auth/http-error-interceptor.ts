import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // this.authenticationService.logout();
        location.reload();
      }
      console.log(err);
      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    }));
};
