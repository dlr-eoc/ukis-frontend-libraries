# This is an angular demo application to show how to use UKIS mapping application with authentication

This application was generated with `ng generate application demo-auth` and then `@dlr-eoc/core-ui:ng-add --routing=true` was applied.

- This app depends on *@dlr-eoc/user-info*
- It implements a AuthGuardService to protect routes
- BasicAuthService which implements IAuthService (your business logic for authentication and authorization)
- HttpAuthInterceptor which uses the AuthService to add a basic token on your angular http requests


## Getting started
- run `npm install` (for ukis-frontend-libraries) 
- run `ng serve demo-auth`
- open a browser on *http://localhost:4200*
