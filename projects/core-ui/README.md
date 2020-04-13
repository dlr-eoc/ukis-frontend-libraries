# @dlr-eoc/core-ui (Schematics for UKIS core-ui)

This is are some schematics to add the base UKIS-Layout to an angular application.
It is based on Clarity so add this first!

For further information how to build custom schematics see [angular schematics](https://angular.io/guide/schematics) and [@angular-devkit](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit).

## This is what the ng-add command is doing

- [add paths for library project in tsconfig.json](schematics/ng-add/index.ts#L260)

- [add styles (for core-ui)](schematics/ng-add/index.ts#L52)

- [add icons](schematics/ng-add/index.ts#L52)

- [adjust index and add favicon](schematics/ng-add/index.ts#L299)

- [add default components (core-ui) for the app and register all in the app module](schematics/ng-add/index.ts#L52)

- [add sample route for map](schematics/ng-add/index.ts#L39)


## Ng Add options

ng add @dlr-eoc/core-ui 

--project=string // the project in the angular workspace
--routing=boolean // default false
--addClr=boolean // run's @clr/angular:ng-add default false

// Not implemented right now!

--addMap=boolean // adds a map component default false
--auth=boolean // default false, adjusts the app for authentication and user login


## Test locally on a new angular project
https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2

2. create a new project `ng new my-project`

1. build the schematics `npm run schematics:build`

3. set Versions in build `node scripts/library/index.js --set`

4. link the Schematics to the project `npm link $PATH_TO_SCHEMATIC_PROJECT` (`npm link ../frontend-libraries/dist/core-ui`)

5. run the schematics `schematics @dlr-eoc/core-ui:ng-add` or `ng generate @dlr-eoc/core-ui:ng-add`


to unlink use 
`npm unlink $PATH_TO_SCHEMATIC_PROJECT` (`npm unlink ../frontend-libraries/dist/core-ui`) // this unfortunately does not remove the full link so you have to run   
`npm uninstall @dlr-eoc/core-ui -g` // this leaves an empty folder @dlr-eoc in the global directory (`npm config get prefix`/node_modules) so remove it later if not needed


### Unit Testing

`npm run schematics:test` will run the unit tests, using Jasmine as a runner and test framework.
`ng test core-ui` will run the unit tests of the lib via [Karma](https://karma-runner.github.io).

### Build Schematics
1. build core-ui
- `ng build core-ui`

2. compile schematics to core-ui build 
- `tsc -p projects/core-ui/tsconfig.schematics.json`

2. copy files (this is done by a [custom builder](core-ui-packagr))
- `cpx projects/core-ui/schematics/collection.json dist/core-ui/schematics/`
- `cpx projects/core-ui/schematics/**/schema.json dist/core-ui/schematics/`
- `cpx projects/core-ui/schematics/*/files/** dist/core-ui/schematics/`
- `cpx projects/core-ui/src/lib/global-alert/** dist/core-ui/schematics/ng-add/files/src/app/components/global-alert/`
- `cpx projects/core-ui/src/lib/global-progress/** dist/core-ui/schematics/ng-add/files/src/app/components/global-progress/`
- ...

### Publishing

*for local publish use*
- in dist/ `npm pack` this creates a ukis-schematics-<version>.tgz file which we can copy.
