# @ukis/user-info


### how use this in a ukis-angular (@ukis/core-ui) project

For a example [see demo auth](../demo-auth/README.md)

#### add the following dependencies to the package.json
- "@ukis/user-info"


#### create a auth service
This service (e.g. basic-auth.service) includes your business logic for authentication and authorization

#### create an AuthGuardService
This service protects your routes and is registered in the AppRoutingModule

#### add the following to the app.module.ts
```
import { UserInfoModule } from '@ukis/user-info';
import { BasicAuthService } from './auth/basic-auth.service';
import { HttpAuthInterceptor } from './auth/http-auth.interceptor';

...

 imports: [
    ...
    UserInfoModule
  ]

  providers: [
    BasicAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (BasicAuthService) => {
        return new HttpAuthInterceptor(BasicAuthService);
      },
      deps: [BasicAuthService],
      multi: true
    }
  ]
```


===

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project user-info` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project user-info`.
> Note: Don't forget to add `--project user-info` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build user-info` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test user-info` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
