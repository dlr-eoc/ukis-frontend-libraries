# @dlr-eoc/cookie-alert

This project contains a component that displays a pop-up for the use of cookies on your website. 
Agreement is stored in the localStorage of your browser with the key *cookie-agree-${host}*

### how to use this in a ukis-angular project

For a example [see demo auth](../demo-auth/README.md)

#### add the following dependencies to the package.json
- "@dlr-eoc/cookie-alert"

#### add the following to app.ts
```
  import { CookieAlertComponent } from '@dlr-eoc/cookie-alert';
  ...
  imports: [
    ...
    CookieAlertComponent
  ]
```

#### add the following to the app.html
```
<ukis-cookie-alert [alert-text]="'my alert text'" [privacy-link]="'link to privacy'"></ukis-cookie-alert>
```

===

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.0.