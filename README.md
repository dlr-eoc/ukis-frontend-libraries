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

## To use the libraries in your project specific application, you can ather use the npm modules or include this repository.
- Use the frontend-libraries as npm modules 
- or Use the typescript modules for frontend-libraries instead of npm modules
- [see Developing libraries and frontend side by side](DEVELOPMENT.md)



## How to setup a new UKIS-Client
1. [see clarity get-started](https://clarity.design/documentation/get-started)
- ng new project-xxx --routing=true --style=scss
- cd project-xxx
- ng add @ukis/core-ui // [see core-ui ng-add](projects/core-ui/schematics/ng-add/schema.json)


## Issues
 http://jira.ukis.eoc.dlr.de/issues/?jql=project%20%3D%20UKISDEV%20AND%20Component%20%3D%20Frontend%20AND%20Labels%20%3D%20master

## Changelog
[see](CHANGELOG.md)