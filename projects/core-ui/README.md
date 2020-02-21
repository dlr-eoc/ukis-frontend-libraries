# @dlr-eoc/core-ui (Schematics for UKIS core-ui)

## Stepps to add ukis to a angular project
- ng new client-src --routing=true --style=scss
- set registry in .npmrc
- ng add @dlr-eoc/core-ui (--registry=https://npm.pkg.github.com)

## This is what the ng-add command is doing
check if @clr is installed, routing is enabled and style is scss and show hints for the user

- [add paths for library project in tsconfig.json](schematics/ng-add/index.ts#L260)

- [add styles (for core-ui)](schematics/ng-add/index.ts#L52)

- [add icons](schematics/ng-add/index.ts#L52)

- [adjust index and add favicon](schematics/ng-add/index.ts#L299)

- [add default components (core-ui) for the app and register all in the app module](schematics/ng-add/index.ts#L52)

- [add sample route for map](schematics/ng-add/index.ts#L39)

## There should be options like?

ng add @dlr-eoc/core-ui 

--project=string // the project in the angular workspace
--routing=boolean // default false
--addClr=boolean // run's @clr/angular:ng-add default true

// Not implemented right now!
--addMap=boolean // adds a map component default false
--auth=boolean // default false, adjusts the app for authentication and user login


===


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
schematics @dlr-eoc/core-ui:ng-add
schematics .:ng-add //In this case we can use relative path instead of the package
```

#### Test on a new angular project
https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2

2. create a new project `ng new my-project`

1. build the schematics `npm run schematics:build`

3. link the Schematics to the project `npm link $PATH_TO_SCHEMATIC_PROJECT` (`npm link ../frontend-libraries/dist/core-ui`)

4. run the schematics `schematics @dlr-eoc/core-ui:ng-add` or `ng generate @dlr-eoc/core-ui:ng-add`


to unlink use 
`npm unlink $PATH_TO_SCHEMATIC_PROJECT` (`npm unlink ../frontend-libraries/dist/core-ui`) // this unfortunately does not remove the full link so you have to run   
`npm uninstall @dlr-eoc/core-ui -g` // this leaves an empty folder @dlr-eoc in the global directory (`npm config get prefix`/node_modules) so remove it later if not needed



### Unit Testing

`npm run schematics:test` will run the unit tests, using Jasmine as a runner and test framework.


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

*for local publish use*
- in dist/ `npm pack` this creates a ukis-schematics-<version>.tgz file which we can copy.
 

===


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project core-ui` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project core-ui`.
> Note: Don't forget to add `--project core-ui` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build core-ui` to build the project. The build artifacts will be stored in the `dist/` directory.

after this build the schematics with `npm run schematics:build` 

## Running unit tests

Run `ng test core-ui` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
