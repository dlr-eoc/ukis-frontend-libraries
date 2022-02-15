<img src="projects/core-ui/schematics/ng-add/files/src/assets/icons/icon-72x72.png" alt="UKIS Logo"> Frontend Libraries for DLR UKIS (Map) Applications
========================

![CI](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/Test%20and%20Build%20CI/badge.svg)
![Npm Package](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/Package%20Main%20Release/badge.svg) ![Package Version](https://img.shields.io/github/v/tag/dlr-eoc/ukis-frontend-libraries?sort=semver)
[![DOI](https://zenodo.org/badge/246639318.svg)](https://zenodo.org/badge/latestdoi/246639318)




This repository (UKIS Frontend Libraries) is a collection of angular components, services, interfaces... which are often used in UKIS mapping applications.

It is the base to create a project specific UKIS Frontend Application.

It uses [angular](https://angular.io/) and the [Clarity Design System](https://vmware.github.io/clarity/).
 

The following libraries/packages are included in this repository:

- [base-layers-raster](projects/base-layers-raster/README.md)
- [cookie-alert](projects/cookie-alert/README.md)
- [core-ui](projects/core-ui/README.md)
- [layer-control](projects/layer-control/README.md)
- [map-tools](projects/map-tools/README.md)
- [map-ol](projects/map-ol/README.md)
- [map-three](projects/map-three/README.md)
- [user-info](projects/user-info/README.md)

- [services-layers](projects/services-layers/README.md)
- [services-map-state](projects/services-map-state/README.md)
- [services-ogc](projects/services-ogc/README.md)
- [services-util-store](projects/services-util-store/README.md)

- [utils-maps](projects/utils-maps/README.md)
- [utils-browser](projects/utils-browser/README.md)
- [utils-ogc](projects/utils-ogc/README.md)


## To use the libraries in your project specific application, you can either use the packaged npm modules or include this repository.

- Use the frontend-libraries as [npm modules](https://www.npmjs.com/search?q=%40dlr-eoc) **Recommended**
- Use the frontend-libraries as npm modules (GitHub Packages) [see How to install Packages from GitHub](DEVELOPMENT.md)
- or use the modules in typescript source via path mapping [see Developing libraries and frontend side by side](DEVELOPMENT.md)


## Getting Started (setup a new UKIS-Client)

1. Generate a new [Angular application](https://angular.io/cli/new) in the same Version like specified in our package.json [@angular/core](package.json).
For this you have to install `@angular/cli` in this specific Version first. 
- `npm install -g @angular/cli@<version>`

Then run:
- `ng new project-<name> --style=scss`

2. Move into the directory
- `cd project-<name>`

3. Add Clarity Angular
- `ng add @clr/angular`

4. Run the ng add command for the UKIS core-ui
- `ng add @dlr-eoc/core-ui [options]` 
  - --routing=boolean // set up your project with [routing](https://angular.io/guide/router)
  - [for more information see core-ui ng-add](projects/core-ui/schematics/ng-add/schema.json)

5. [See layout structure of the core-ui](projects/core-ui/README.md#layout-structure-of-the-core-ui)

6. [See clarity get-started to use there ui components](https://clarity.design/documentation/get-started)



## Demos

Check our demos on stackblitz
- [Basic layout of the application](https://stackblitz.com/edit/clarity-v4-dlr-eoc-ukis-v7)
- [Map demo with OpenLayers](https://stackblitz.com/edit/clarity-v4-dlr-eoc-ukis-v7-map)

and GitHub Pages
- [Angular app from projects/demo-maps](https://dlr-eoc.github.io/ukis-frontend-libraries/)



## Team

The UKIS team creates and adapts libraries which simplify the creation of web-based applications. Our team includes (in alphabetical order):

 - Böck, Mathias 
 - Friedemann, Monika
 - Jaspersen, Verena
 - Keim, Stefan 
 - Langbein, Michael 
 - Mandery, Nico 
 - Mühlbauer Martin 
 - Volkmann, Rouven 
 - Riedlinger, Torsten 
 - Voinov, Sergey 




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

