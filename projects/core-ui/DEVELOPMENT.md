## Test the Schematics locally on a new angular project
https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2

1. Use stricter checks in editor (e.g. add the following to main tsconfig.json or use tsconfig.schematics.json)
````
"compilerOptions": {
  ...
  "noFallthroughCasesInSwitch": true,
  "noUnusedParameters": true,
  "noUnusedLocals": true,
  "strictNullChecks": true,
  ...
}
```

2. build the schematics `ng build core-ui`

3. set Versions in build `node scripts/library/index.js --set`

4. create a new project `ng new my-project`

5. link to the Schematics in the new project `npm link $PATH_TO_SCHEMATIC_PROJECT` e.g. (`npm link ../frontend-libraries/dist/core-ui`)

6. run the schematics in the new project `schematics @dlr-eoc/core-ui:ng-add` or `ng generate @dlr-eoc/core-ui:ng-add` or `ng generate @dlr-eoc/core-ui:ng-add --routing=true`

7. Update -> run step 1. and 2 again (You don't have to unlink and relink)


to unlink use 
`npm unlink $PATH_TO_SCHEMATIC_PROJECT` (`npm unlink ../frontend-libraries/dist/core-ui`) // this unfortunately does not remove the full link so you have to run   
`npm uninstall @dlr-eoc/core-ui -g` // this leaves an empty folder @dlr-eoc in the global directory (`npm config get prefix`/node_modules) so remove it later if not needed


remove files in test app:
- `git clean -fd`
- `git checkout .`

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


## Update schematics
- https://timdeschryver.dev/blog/ng-update-the-setup

- https://github.com/angular/angular/blob/14.0.5/packages/core/package.json#L28
- https://github.com/angular/angular/blob/14.0.5/packages/core/schematics/migrations.json
