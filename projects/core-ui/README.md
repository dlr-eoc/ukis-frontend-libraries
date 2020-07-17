# @dlr-eoc/core-ui (Schematics for UKIS core-ui)

This project includes some schematics to add the base UKIS-Layout to an angular application.
It is based on Clarity so add this first!

## What the ng-add command is doing?

```
ng add @dlr-eoc/core-ui
```

- [add paths for library project in tsconfig.json](schematics/ng-add/index.ts#L273)

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

### For a application with routes:
we use a basic layout like the following, containing the router-outlet which then shows route components as the Clarity `content-container`.
```
<clr-main-container [ngClass]="{'floating':ui.floating}">
  <ukis-global-alert *ngIf="ui.alert" [(alert)]="ui.alert"></ukis-global-alert>
  <ukis-global-progress *ngIf="ui.progress" [(progress)]="ui.progress"></ukis-global-progress>
  <ukis-header [ukis-title]="title">
    ...
  </ukis-header>
  <router-outlet></router-outlet>
</clr-main-container>
```

### For a application without routes:
we replace the router-outlet with a view component who also adds the Clarity `content-container` class as HostBinding.
```
<clr-main-container [ngClass]="{'floating':ui.floating}">
  <ukis-global-alert *ngIf="ui.alert" [(alert)]="ui.alert"></ukis-global-alert>
  <ukis-global-progress *ngIf="ui.progress" [(progress)]="ui.progress"></ukis-global-progress>
  <ukis-header [ukis-title]="title">
  ...
  </ukis-header>
  <app-example-view></app-example-view>
</clr-main-container>
```

- The css class `floating` on the `main-container` makes the [Clarity Vertical Nav](https://clarity.design/documentation/vertical-nav/collapsible-nav/normal) floating above the `content-container` so it takes less space. For this, however, you have to worry about the placement of the elements in the `content-container` if the `vertical-nav` is expanded.
- The `global-alert` and `global-progress` can be activated with their responsible services which you can inject in your components.
- For more doku about the `ukis-header` [see](src/lib/header/README.md)


**Always check that yout layout structure is like following (with direct childs)**:
```
main-container
  content-container
    content-area
```

and be aware that the router is placing the routes outside of the router-outlet (so they are not childs)
```
main-container
  router-outlet
  route-component
```

so you must add the the class `content-container` as HostBinding to each 'route-component'.


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

- The route or view component uses the `content-container` class like described before, so you should normally be able to put everything in there like shown in the documentation of [Clarity Application Layout](https://clarity.design/documentation/app-layout).

- The `content-area` is the place where we put normally the map.

- As Aside we mostly use the `vertical-nav`. The default placement is on the left side like in the Clarity Layout, but with the class `right` the navigation will stick to the right side.
There are also some styles for the `layer-control` inside a `vertical-nav`, so this is the place where we put the `layer-control`.

- A section with the class `footer` will get you a footer element independent for each route. If it should be the same for all routes, you can add it in the `main-container`. For an example with the footer see the `demo-maps` route 'route-example-layout'.

- The `sidenav` is only rarely used by us.

- All our styles (ukis-theme) are in the styles folder and get imported in the main styles.scss.
For app over all styles you can use the styles.scss, otherwise use the style files of your components to write custom styles.


## Test the Schematics locally on a new angular project
https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2

1. build the schematics `ng build core-ui`

2. set Versions in build `node scripts/library/index.js --set`

3. create a new project `ng new my-project`

4. link to the Schematics in the new project `npm link $PATH_TO_SCHEMATIC_PROJECT` e.g. (`npm link ../frontend-libraries/dist/core-ui`)

5. run the schematics in the new project `schematics @dlr-eoc/core-ui:ng-add` or `ng generate @dlr-eoc/core-ui:ng-add`


to unlink use 
`npm unlink $PATH_TO_SCHEMATIC_PROJECT` (`npm unlink ../frontend-libraries/dist/core-ui`) // this unfortunately does not remove the full link so you have to run   
`npm uninstall @dlr-eoc/core-ui -g` // this leaves an empty folder @dlr-eoc in the global directory (`npm config get prefix`/node_modules) so remove it later if not needed


### Unit Testing

`npm run schematics:test` will run the unit tests, using Jasmine as a runner and test framework.
`ng test core-ui` will run the unit tests of the lib via [Karma](https://karma-runner.github.io).

### Build Schematics

- `ng build core-ui`

The above command compiles the schematics
`tsc -p projects/core-ui/tsconfig.schematics.json`

and copies the files
- `cpx projects/core-ui/schematics/collection.json dist/core-ui/schematics/`
- `cpx projects/core-ui/schematics/**/schema.json dist/core-ui/schematics/`
- `cpx projects/core-ui/schematics/*/files/** dist/core-ui/schematics/`
- `cpx projects/core-ui/src/lib/global-alert/** dist/core-ui/schematics/ng-add/files/src/app/components/global-alert/`
- `cpx projects/core-ui/src/lib/global-progress/** dist/core-ui/schematics/ng-add/files/src/app/components/global-progress/`
- ...

This is done by a [custom builder](core-ui-packagr/index.js)

### Publishing

*for local publish use*
- in dist/ `npm pack` this creates a ukis-schematics-<version>.tgz file which we can copy.


For further information how to build custom schematics see [angular schematics](https://angular.io/guide/schematics) and [@angular-devkit](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit).
