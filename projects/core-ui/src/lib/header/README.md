# UKIS Header

- This is a container element to insert all elements with class *.header-action-el* or *.header-nav-el* into the Clarity header *header-actions* and *header-nav* viva 
  angular Content Projection and ng-content. For further information what items can be used see [Clarity Header](https://clarity.design/documentation/header)
- you can also set the Header title with [ukis-title]="title"

### how to use this in a ukis-angular (@dlr-eoc/core-ui) project

For examples [see demo maps](../demo-maps/README.md)

#### in the app.component.html 
```
<clr-main-container [ngClass]="{'floating':ui.floating}">
  ...
  <ukis-header [ukis-title]="title">
    <a class="nav-link nav-text header-nav-el" routerLink="/{{route.path}}" routerLinkActive="active">{{route.data.title}}</a>

    <clr-dropdown class="header-action-el">
      ...
    </clr-dropdown>
  </ukis-header>
  ...
</clr-main-container>
```

#### Inputs
- ukis-title
- ukis-short-title
- ukis-version

