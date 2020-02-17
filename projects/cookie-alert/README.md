# @ukis/cookie-alert

This project contains a component that displays a pop-up for the use of cookies on your website. 
Agreement is stored in the localStorage of your browser with the key *cookie-agree-${host}*

### how use this in a ukis-angular (@ukis/core-ui) project

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




