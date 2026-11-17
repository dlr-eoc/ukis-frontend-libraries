import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { BasicAuthSvc } from "./basic-auth-svc";

export const httpAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(BasicAuthSvc);
  const cloneReq = req.clone({
    // withCredentials: false,
    setHeaders: {
      Authorization: `${auth.getToken()}`,
      "Content-Type": "application/json",
    },
  });
  console.log("HttpAuthInterceptor", cloneReq);
  return next(cloneReq);
};
