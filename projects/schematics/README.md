# UKIS Schematics

Add's UKIS specific files and folders to your angular project.
- add paths to tsconfig.json
- deps to package.json
- add assets and styles
- adjust angular.json
- add base components and route-components folder
- adjust app.module.ts, app.component.html...


```
schematics <package-name>:<schematic-name> [...options].
schematics @ukis/schematics:add
schematics .:add //In this case we can use relative path instead of the package
```

--- 
This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
 