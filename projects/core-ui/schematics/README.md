# Stepps to add ukis to a angular project
- ng new client-src --routing=true --style=scss
- ng add @clr/angular
- ng add @ukis/core-ui --registry=http://hofer.eoc.dlr.de/nexus/content/groups/npm-all

# This is what the ng-add should do (ng g @ukis/core-ui:ng-add)
- check if @clr is installed, routing is enabled and style is scss and show hints for the user

- add .npmrc file for ukis registry - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/c93a5f43e87d862be86c8f51650a973094010e9f

- add paths for library project in tsconfig.json - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/e6c884e77bc9553e1c29c0d16273efe068320856

- add styles (for core-ui) - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/1becc033df579af69bd82869c5c32189309d0e14

- add icons - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/dc7ea413ccb11581934b7e7163221ae2e52fe94e

- add app manifest - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/063ad228a86a4c64980d805784c1700dd3421a02

- adjust index and add favicon - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/ae9e95d1ca06bd9b61afbee8195be4cf4a1a7990#components/client/client-src/src/index.html

- add default components (core-ui) for the app and register all in the app module - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/ac47ac38381acdc53f01f0d873386ea4ff494d2a

- add sample route for map - http://git.ukis.eoc.dlr.de/users/asam_hu/repos/nextg-airquality-pilot/commits/489570dba1d02c93ab90054cef800fa6434911db

## there shoul be options like?

ng add @ukis/core-ui 

--auth=boolean // default false, adjusts the app for authentication and user login
--routing=boolean // default true 
--map=boolean // adds a map component
--registry is used to create the .npmrc file








# Getting Started With Schematics

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
`npm unlink $PATH_TO_SCHEMATIC_PROJECT` // this unfortunately do not remove the full link so do 
`npm uninstall @ukis/core-ui -g` // this leaves an empty folder @ukis in the global directory so remove it later if not needed



### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!


*for local publish use*
- in dist/ `npm pack` this creates a ukis-schematics-<version>.tgz file which we can copy.
 