![UKIS Logo](projects/core-ui/schematics/ng-add/files/src/assets/icons/icon-96x96.png "UKIS Logo")

# Frontend Libraries for UKIS (Map) Applications

This is a repository that hosts all libraries that are imported into project specific UKIS Frontend Applications. 
It uses [angular](https://angular.io/) and the [Clarity Design System](https://vmware.github.io/clarity/).
The dependencies to the needed modules are defined in package.json and are stored in node_modules.  

This repository contains the following modules as angular libraries:

- services-layers
- services-map-state
- services-util-store
- services-ogc

- map-ol
- base-layers-raster
- layer-control
- map-navigator
- cookie-alert
- user-info
- owc-control
- core-ui

you can check this with the script `node scripts/library/index.js -l`;
to check the dependencies of the libraries use `node scripts/library/index.js -d` or `node scripts/library/index.js --depsPeer`

## To use the libraries in your project specific application, you can either use the packaged npm modules or include this repository.
- Use the frontend-libraries as npm modules 
- or use the typescript modules for frontend-libraries instead of npm modules
- [see Developing libraries and frontend side by side](DEVELOPMENT.md)


## How to setup a new UKIS-Client
```
ng new <projectname>
ng add @ukis/core-ui
```

## Issues
You can add issues on [github](https://github.com/dlr-eoc/frontend-libraries/issues).
Please read the [contribution-guide](CONTRIBUTING.md) for information on how to add issues.


## Changelog
[see](CHANGELOG.md)

# Licensing
This project is licensed under the [Apache-2 license](LICENSE). Bundled applications also use third-party libraries that are distributed under their own terms. Their licenses can be found in the bundle-sourcecode in a file named `3rdpartylicenses.txt`.