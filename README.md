<img src="projects/core-ui/schematics/ng-add/files/src/assets/icons/icon-96x96.png" alt="UKIS Logo"> Frontend Libraries for UKIS (Map) Applications
========================

![CI](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/CI/badge.svg)
![Node.js Package](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/Node.js%20Package/badge.svg?event=registry_package)




This repository hosts all libraries that are imported into project specific UKIS Frontend Applications. 
It uses [angular](https://angular.io/) and the [Clarity Design System](https://vmware.github.io/clarity/).
The dependencies to the used modules are defined in package.json and are stored in node_modules.  

This repository contains the following modules as angular libraries:

- [base-layers-raster](projects/base-layers-raster/README.md)
- [cookie-alert](projects/cookie-alert/README.md)
- [core-ui](projects/core-ui/README.md)
- [layer-control](projects/layer-control/README.md)
- [map-navigator](projects/map-navigator/README.md)
- [map-ol](projects/map-ol/README.md)
- [owc-control](projects/owc-control/README.md)
- [user-info](projects/user-info/README.md)

- [services-layers](projects/services-layers/README.md)
- [services-map-state](projects/services-map-state/README.md)
- [services-ogc](projects/services-ogc/README.md)
- [services-util-store](projects/services-util-store/README.md)




## To use the libraries in your project specific application, you can either use the packaged npm modules or include this repository.

- Use the frontend-libraries as npm modules (GitHub Packages) (Recommended)
- or use the modules in typescript source via path mapping [see Developing libraries and frontend side by side](DEVELOPMENT.md)


**How to install Packges from GitHub**

1. [Create a personal access token on your github account](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with (read:packages, repo, write:packages)

2. Authenticate by logging in to npm, use the npm login

3. Create a [.npmrc file](https://docs.npmjs.com/configuring-npm/npmrc.html) in your folder or use --registry=https://npm.pkg.github.com on npm install

for more information see [configuring-npm-for-use-with-github-packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)




## Getting Started (setup a new UKIS-Client)

1. Generate a new [Angular application](https://angular.io/cli/new)
- `ng new project-<name> --style=scss`

2. Move into the directory
- `cd project-<name>`

3. Run the ng add command for ukis/core-ui

- `ng add @ukis/core-ui [options]` 
  - --routing=boolean // set up your project with [routing](https://angular.io/guide/router)
  - --addClr=boolean // runs ng add @clr/angular default=true
  - [for more information see core-ui ng-add](projects/core-ui/schematics/ng-add/schema.json)

4. [see clarity get-started to use the components](https://clarity.design/documentation/get-started)




## Licenses

This software is licensed under the [Apache 2.0 License](LICENSE).

(c) 2020 German Aerospace Center (DLR); German Remote Sensing Data Center; Department: Geo-Risks and Civil Security




## Changelog

[Learn about the latest changes and features](CHANGELOG.md).




## Contributing

The UKIS team welcomes contributions from the community.
For more detailed information, see our [guide on contributing](CONTRIBUTING.md) if you're interested in getting involved.
