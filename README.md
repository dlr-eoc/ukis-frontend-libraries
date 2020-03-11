<img src="projects/core-ui/schematics/ng-add/files/src/assets/icons/icon-72x72.png" alt="UKIS Logo"> Frontend Libraries for DLR UKIS (Map) Applications
========================

![CI](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/CI/badge.svg)
![Node.js Package](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/Node.js%20Package/badge.svg?event=registry_package)




This repository (UKIS Frontend Libraries) is a collection of angular components, services, interfaces... which are often used in UKIS mapping applications.

It is the base to create a project specific UKIS Frontend Application.

It uses [angular](https://angular.io/) and the [Clarity Design System](https://vmware.github.io/clarity/).
 

The following angular libraries are included in this repository:

- [base-layers-raster](projects/base-layers-raster/README.md)
- [cookie-alert](projects/cookie-alert/README.md)
- [core-ui](projects/core-ui/README.md)
- [layer-control](projects/layer-control/README.md)
- [map-tools](projects/map-tools/README.md)
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


**How to install Packages from GitHub**

1. [Create a personal access token on your github account](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with (read:packages, repo, write:packages)

2. Authenticate by logging in to GitHub npm Package Registry, use the npm login

3. Create a [.npmrc file](https://docs.npmjs.com/configuring-npm/npmrc.html) in your folder or use --registry=https://npm.pkg.github.com on npm install

for more information see [configuring-npm-for-use-with-github-packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)




## Getting Started (setup a new UKIS-Client)

1. Generate a new [Angular application](https://angular.io/cli/new)
- `ng new project-<name> --style=scss`

2. Move into the directory
- `cd project-<name>`

3. Add Clarity Angular
`ng add @clr/angular`

4. Run the ng add command for the UKIS core-ui
- `ng add @dlr-eoc/core-ui [options]` 
  - --routing=boolean // set up your project with [routing](https://angular.io/guide/router)
  - [for more information see core-ui ng-add](projects/core-ui/schematics/ng-add/schema.json)

5. [see clarity get-started to use there ui components](https://clarity.design/documentation/get-started)





## Team

The UKIS team works hard to create libraries that simplify the creation of webbased geo-applications.
Our team includes (in alphabetical order):

 - Mathias Böck
 - Monika Friedemann
 - Stefan Keim
 - Michael Langbein
 - Nico Mandery
 - Martin Mühlbauer
 - Torsten Riedlinger
 - Sergey Voinov




## Licenses

This software is licensed under the [Apache 2.0 License](LICENSE).

Copyright (c) 2020 German Aerospace Center (DLR) * German Remote Sensing Data Center * Department: Geo-Risks and Civil Security




## Changelog

[Learn about the latest changes and features](CHANGELOG.md).




## Contributing

The UKIS team welcomes contributions from the community.
For more detailed information, see our [guide on contributing](CONTRIBUTING.md) and [development](DEVELOPMENT.md) if you're interested in getting involved.


## What is UKIS?

The DLR project Environmental and Crisis Information System (the German abbreviation is UKIS, standing for [Umwelt- und Kriseninformationssysteme](https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-5413/10560_read-21914/)) aims at harmonizing the development of information systems at the German Remote Sensing Data Center (DFD) and setting up a framework of modularized and generalized software components.

UKIS is intended to ease and standardize the process of setting up specific information systems and thus bridging the gap from EO product generation and information fusion to the delivery of products and information to end users.

Furthermore the intention is to save and broaden know-how that was and is invested and earned in the development of information systems and components in several ongoing and future DFD projects.

