# @ukis/cookie-alert

This project contains a component that displays a pop-up for the use of cookies on your website. 
Agreement is stored in the localStorage of your browser with the key *cookie-agree-${host}*

### how to use this in a ukis-angular (@ukis/core-ui) project

For a example [see demo auth](../demo-auth/README.md)

#### add the following dependencies to the package.json
- "@ukis/cookie-alert"

#### add the following to the app.module.ts
```
  import { CookieAlertModule } from '@ukis/cookie-alert';
  ...
  imports: [
    ...
    CookieAlertModule
  ]
```

or 

```
  import { CookieAlertComponent } from '@ukis/cookie-alert';
  ...
  declarations: [
    ...
    CookieAlertModule
  ]
```

#### add the following to the app.component.html
```
<ukis-cookie-alert [alert-text]="'my alert text'" [privacy-link]="'link to privacy'"></ukis-cookie-alert>
```




===


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project cookie-alert` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project cookie-alert`.
> Note: Don't forget to add `--project cookie-alert` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build cookie-alert` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test cookie-alert` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


