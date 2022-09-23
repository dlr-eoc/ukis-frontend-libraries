# @dlr-eoc/core-ui (Schematics for UKIS core-ui)

This project includes some schematics to add the base UKIS-Layout to an angular application.
It is based on Clarity so [add this first](https://clarity.design/get-started/developing/angular)!

## What the ng-add command is doing?

```
ng add @dlr-eoc/core-ui
```

- [add paths for library project in tsconfig.base.json](schematics/ng-add/index.ts#L273)

- [add styles and files (for core-ui)](schematics/ng-add/index.ts#L61)

- [adjust index.html and add favicon](schematics/ng-add/index.ts#L312)

- [add default components (core-ui) for the app and register all in the app module](schematics/ng-add/index.ts#L177)


**options:**

--project=string // the project in the angular workspace (default 'defaultProject')

--routing=boolean // sets up angular routing (default false)

--addClr=boolean // run's @clr/angular:ng-add (default false)


> The following are not implemented right now!

--addMap=boolean // adds a map component (default false)

--auth=boolean // default false, adjusts the app for authentication and user login


## layout structure of the core-ui

The UKIS core-ui (created by the the schematics) is based on the [Clarity Application Layout](https://clarity.design/documentation/app-layout).

It uses the angular components from Clarity to get a responsive navigation. 

### For an application with routes:
Use a basic layout like the following, containing the router-outlet which then shows route components as the Clarity `content-container`.
```
<clr-main-container>
  <ukis-global-alert *ngIf="ui.alert" [(alert)]="ui.alert"></ukis-global-alert>
  <ukis-global-progress *ngIf="ui.progress" [(progress)]="ui.progress"></ukis-global-progress>
  <ukis-header [ukis-title]="title">
    ...
  </ukis-header>
  <router-outlet></router-outlet>
</clr-main-container>
```

### For an application without routes:
Replace the router-outlet with a view component which also adds the Clarity `content-container` class as HostBinding.
```
<clr-main-container>
  <ukis-global-alert *ngIf="ui.alert" [(alert)]="ui.alert"></ukis-global-alert>
  <ukis-global-progress *ngIf="ui.progress" [(progress)]="ui.progress"></ukis-global-progress>
  <ukis-header [ukis-title]="title">
  ...
  </ukis-header>
  <app-example-view></app-example-view>
</clr-main-container>
```

- A css class `floating` on the `content-container` (which is mostly placed in your route components) makes the [Clarity Vertical Nav](https://clarity.design/documentation/vertical-nav/collapsible-nav/normal) floating above the `content-container` so it takes less space. For this, however, you have to worry about the placement of the elements in the `content-container` if the `vertical-nav` is expanded.
- The `global-alert` and `global-progress` can be activated with their responsible services which you can inject in your components.
- For more doku about the `ukis-header` [see the header README](src/lib/header/README.md)


**Always check that yout layout structure is like following (with direct childs)**:
```
main-container
  content-container
    content-area
```

and keep in mind that the router is placing the routes outside of the router-outlet (so they are not children)
```
main-container
  router-outlet
  route-component
  ...
```

due to this you must add the class `content-container` as HostBinding to each 'route-component'.


### Layout of a route or view component
The basic layout of a route or view component (see below) is the same so you can easily change it if you decide later to switch between routing or not.

```
<main class="content-area">
  <p>This is the content-area</p>
</main>

<clr-vertical-nav class="right">
</clr-vertical-nav>

<nav class="sidenav">
  <a href="">Test link</a>
</nav>

<section class="footer ukis-footer">

</section>
```

- The route or view component uses the `content-container` class like described before, so you should normally be able to put everything in there which is shown in the documentation of [Clarity Application Layout](https://clarity.design/documentation/app-layout).

- The `content-area` is the place where we put the map normally. If you like to do this ad the class `map-view` (`content-area map-view`) to remove the padding from the `content-area`.

- As Aside we mostly use the `vertical-nav`. The default placement is on the left side like in the Clarity Layout, but with the class `right` the navigation will stick to the right side.
There are also some styles for the `layer-control` inside a `vertical-nav`, so this is the place where we put the `layer-control`.

- A section with the class `footer` will get you a footer element independent for each route. If it should be the same for all routes, you can add it in the `main-container`. For an example with the footer see the `demo-maps` route 'route-example-layout'.

- Use the `sidenav` if you don't want the navigation collapsible, but we have no style for a `layer-control` inside it.

- All our styles (ukis-theme) are in the styles folder and get imported in the main styles.scss.
For app over all styles you can use the styles.scss, otherwise use the style files of your components to write custom styles.
