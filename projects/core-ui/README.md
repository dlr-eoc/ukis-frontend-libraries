# UKIS Core-Ui

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project core-ui` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project core-ui`.
> Note: Don't forget to add `--project core-ui` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build core-ui` to build the project. The build artifacts will be stored in the `dist/` directory.

after this build the schematics with `npm run schematics:build` 

## Publishing

After building your library with `ng build core-ui`, go to the dist folder `cd dist/core-ui` and run `npm publish`.

## Running unit tests

Run `ng test core-ui` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).







# Schematics for UKIS Core-Ui

## Stepps to add ukis to a angular project
- ng new client-src --routing=true --style=scss
- ng add @clr/angular
- set registry in .npmrc
- ng add @ukis/core-ui (--registry=http://hofer.eoc.dlr.de/nexus/content/groups/npm-all)

## This is what the ng-add should do (ng g @ukis/core-ui:ng-add)
- check if @clr is installed, routing is enabled and style is scss and show hints for the user

- [add paths for library project in tsconfig.json](http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/e6c884e77bc9553e1c29c0d16273efe068320856)

- [add styles (for core-ui)](http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/1becc033df579af69bd82869c5c32189309d0e14)

- [add icons](http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/dc7ea413ccb11581934b7e7163221ae2e52fe94e)

- [adjust index and add favicon](http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/ae9e95d1ca06bd9b61afbee8195be4cf4a1a7990#components/client/client-src/src/index.html)

- [add default components (core-ui) for the app and register all in the app module](http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/ac47ac38381acdc53f01f0d873386ea4ff494d2a)

- [add sample route for map](http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/489570dba1d02c93ab90054cef800fa6434911db)

## there should be options like?

ng add @ukis/core-ui 

--project=string // the project in the angular workspace
--auth=boolean // default false, adjusts the app for authentication and user login
--routing=boolean // default false
--addMap=boolean // adds a map component default false
--addClr=boolenan // runns @clr/angular:ng-add default true



---------------------------------------------------------------------------------------------------------------------------
## Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

```
schematics <package-name>:<schematic-name> [...options].
schematics @ukis/core-ui:ng-add
schematics .:ng-add //In this case we can use relative path instead of the package
```

#### Test on a new angular project
https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2

2. create a new project `ng new my-project`

1. build the schematics `npm run schematics:build`

3. link the Schematics to the project `npm link $PATH_TO_SCHEMATIC_PROJECT` (`npm link ../frontend-libraries/dist/core-ui`)

4. run the schematics `schematics @ukis/core-ui:ng-add`


to unlink use 
`npm unlink $PATH_TO_SCHEMATIC_PROJECT` (`npm unlink ../frontend-libraries/dist/core-ui`) // this unfortunately do not remove the full link so do 
`npm uninstall @ukis/core-ui -g` // this leaves an empty folder @ukis in the global directory (.../AppData/Roaming/npm/node_modules) so remove it later if not needed



### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.


### Build Schematics
1. build core-ui
- `ng build core-ui`

2. compile schematics to core-ui build 
- `tsc -p projects/core-ui/tsconfig.schematics.json`

2. copy files
- `cpx projects/core-ui/schematics/collection.json dist/core-ui/schematics/`
- `cpx projects/core-ui/schematics/**/schema.json dist/core-ui/schematics/`
- `cpx projects/core-ui/schematics/*/files/** dist/core-ui/schematics/`
- `cpx projects/core-ui/src/lib/global-alert/** dist/core-ui/schematics/ng-add/files/src/app/components/global-alert/`
- `cpx projects/core-ui/src/lib/global-progress/** dist/core-ui/schematics/ng-add/files/src/app/components/global-progress/`

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!


*for local publish use*
- in dist/ `npm pack` this creates a ukis-schematics-<version>.tgz file which we can copy.
 
