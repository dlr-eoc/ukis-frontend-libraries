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

2. build the schematics `npm run build --workspace=projects/ngx-ukis-ui-clarity && npm run schematics:build --workspace=projects/ngx-ukis-ui-clarity` 

3. create a new project `ng new my-project`

4. link to the Schematics in the new project `npm link $PATH_TO_SCHEMATIC_PROJECT` e.g. (`npm link ../frontend-libraries/dist/ngx-ukis-ui-clarity`)

5. run the schematics in the new project `schematics @dlr-eoc/ngx-ukis-ui-clarity:ng-add` or `ng generate @dlr-eoc/ngx-ukis-ui-clarity:ng-add --project=<my-project>` or `ng generate @dlr-eoc/ngx-ukis-ui-clarity:ng-add --project=<my-project> --routing=true`

6. Update -> run step 2. again (You don't have to unlink and relink)


to unlink use 
`npm unlink $PATH_TO_SCHEMATIC_PROJECT` (`npm unlink ../frontend-libraries/dist/ngx-ukis-ui-clarity`) // this unfortunately does not remove the full link so you have to run   
`npm uninstall @dlr-eoc/ngx-ukis-ui-clarity -g` // this leaves an empty folder @dlr-eoc in the global directory (`npm config get prefix`/node_modules) so remove it later if not needed


remove files in test app:
- `git clean -fd && git checkout .`

### Unit Testing

`npm run schematics:test --workspace=projects/ngx-ukis-ui-clarity` will run the unit tests, using Jasmine as a runner and test framework.
`ng test ngx-ukis-ui-clarity` will run the unit tests of the lib via [Karma](https://karma-runner.github.io).

### Build Schematics

- `npm run build --workspace=projects/ngx-ukis-ui-clarity && npm run schematics:build --workspace=projects/ngx-ukis-ui-clarity` 

The above command compiles the schematics
`tsc -p projects/ngx-ukis-ui-clarity/tsconfig.schematics.json`

and copies the files (ng build ngx-ukis-ui-clarity ng-package.json assets)
- `projects/ngx-ukis-ui-clarity/schematics/collection.json dist/ngx-ukis-ui-clarity/schematics/`
- `projects/ngx-ukis-ui-clarity/schematics/**/schema.json dist/ngx-ukis-ui-clarity/schematics/`
- `projects/ngx-ukis-ui-clarity/schematics/*/files/** dist/ngx-ukis-ui-clarity/schematics/`
- `projects/ngx-ukis-ui-clarity/src/lib/global-alert/** dist/ngx-ukis-ui-clarity/schematics/ng-add/files/src/app/components/global-alert/`
- `projects/ngx-ukis-ui-clarity/src/lib/global-progress/** dist/ngx-ukis-ui-clarity/schematics/ng-add/files/src/app/components/global-progress/`
- ...

### Publishing

*for local publish use*
- in dist/ `npm pack` this creates a ukis-schematics-<version>.tgz file which we can copy.


For further information how to build custom schematics see [angular schematics](https://angular.io/guide/schematics) and [@angular-devkit](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit).


## Update schematics
- https://timdeschryver.dev/blog/ng-update-the-setup

- https://github.com/angular/angular/blob/14.0.5/packages/core/package.json#L28
- https://github.com/angular/angular/blob/14.0.5/packages/core/schematics/migrations.json
