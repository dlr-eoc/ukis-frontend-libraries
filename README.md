<img src="projects/core-ui/schematics/ng-add/files/src/assets/icons/icon-72x72.png" alt="UKIS Logo"> Frontend Libraries for DLR UKIS (Map) Applications
========================

![CI](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/Test%20and%20Build%20CI/badge.svg)
![Npm Package](https://github.com/dlr-eoc/ukis-frontend-libraries/workflows/Package%20Main%20Release/badge.svg) ![Package Version](https://img.shields.io/github/v/tag/dlr-eoc/ukis-frontend-libraries?sort=semver)
[![DOI](https://zenodo.org/badge/246639318.svg)](https://zenodo.org/badge/latestdoi/246639318)

## About the UKIS Frontend?

The project Environmental and Crisis Information Systems (UKIS - the German abbreviation for Umwelt- und Kriseninformationssysteme) aims at harmonizing and simplifying the development of geospatial web information systems by setting up a framework of modularized and generalized software components. UKIS is divided into the open source UKIS Frontend (dlr-eoc/ukis-frontend-libraries) for the visualization of geodata on the web and a UKIS backend that provides geodata through web services and analysis functionalities. Some of these [backend services](https://github.com/orgs/dlr-eoc/repositories?q=ukis) are also open source.

The UKIS Frontend is a combination of multiple open source software libraries and frameworks to simplify the rapid creation of intuitive geospatial web apps. This is achieved as follows:
Specification of a consistent user interface using the [Clarity Design System](https://clarity.design) with many UI components and styling guidelines.
Web standards such as component-based development, single-page application routing, client-server communication, and tools to build, test, and update the software using the [Angular development platform](https://angular.io).
Visualization of geodata using the mapping library [OpenLayers](https://openlayers.org), making it possible to integrate all kinds of data and standards such as those from OGC.
An abstraction layer for the mapping library describes all types and interfaces, so that it is possible to integrate other mapping libraries using the same UI components. Furthermore, there are utility functions, components for map controls and tools as well as interfaces to OGC standards.

UKIS is developed at the German Remote Sensing Data Center (DFD), an institute at the German Aerospace Center (DLR). Examples of past and current developments based on UKIS are in the context of natural hazards (e.g. for floods, forest fires, tsunami), environmental monitoring (e.g. for snow cover, coastal usage, land cover), civil security (e.g. maritime surveillance, ship detection, ice monitoring), health applications (e.g. COVID-19) as well as planetary sciences (e.g. planetary geology).




## Demos

Example map demos: [The application for projects/demo-maps](https://dlr-eoc.github.io/ukis-frontend-libraries/) (GitHub Pages)

Projects on stackblitz
- [Basic layout of the application](https://stackblitz.com/edit/clarity-v4-dlr-eoc-ukis-v7)
- [Map demo with OpenLayers](https://stackblitz.com/edit/clarity-v4-dlr-eoc-ukis-v7-map)




## To use the libraries in your angular application, you can either use the packaged npm modules or include this repository.

- Use the frontend-libraries as [npm modules](https://www.npmjs.com/search?q=%40dlr-eoc) **Recommended**

- Use the frontend-libraries as npm modules (GitHub Packages) [see How to install Packages from GitHub](DEVELOPMENT.md)

- or use the modules in typescript source via path mapping [see Developing libraries and frontend side by side](DEVELOPMENT.md)




Libraries/packages and demo applications can be found in the [projects folder](projects).

Here are a few examples:
- [The OpenLayers map component](projects/map-ol/README.md)
- [The UI component to manage layers on a map](projects/layer-control/README.md)
- [Tools for the map like "mouse position" or "projection-switch"](projects/map-tools/README.md)
- [The angular service which handles layers (add/remove and update)](projects/services-layers/README.md)
- ...




## Getting Started (setup a new UKIS-Client)

1. Generate a new [Angular application](https://angular.io/cli/new) in the same Version like specified in our package.json [@angular/core](package.json).
For this you have to install `@angular/cli` in this specific Version first. 
- `npm install -g @angular/cli@<version>`

Then run:
- `ng new project-<name> --style=scss`

2. Move into the directory
- `cd project-<name>`

3. Add Clarity Angular
- See [Adding Clarity to an Angular project](https://clarity.design/documentation/get-started#seedProjectAngular)
- If you use Clarity Core also [add the icons manually](https://core.clarity.design/foundation/icons/)

4. Run the ng add command for the UKIS core-ui
- `ng add @dlr-eoc/core-ui --project=<appName> [options]` 
  - --routing=boolean // set up your project with [routing](https://angular.io/guide/router)
  - [for more information see core-ui ng-add](projects/core-ui/schematics/ng-add/schema.json)

5. [See layout structure of the core-ui](projects/core-ui/README.md#layout-structure-of-the-core-ui)

6. [See clarity get-started to use their components](https://clarity.design/documentation/get-started)

More detailed information about setting up a local UKIS application can be found in the [tutorial document](TUTORIALS.md).


## Team

The UKIS team creates and adapts libraries which simplify the creation of web-based applications. Our team includes (in alphabetical order):

 - Angermann, Lucas
 - Böck, Mathias
 - Friedemann, Monika
 - Jaspersen, Verena
 - Keim, Stefan
 - Langbein, Michael
 - Mandery, Nico
 - Mühlbauer Martin
 - Riedlinger, Torsten
 - Voinov, Sergey
 - Volkmann, Rouven




## Licenses

This software is licensed under the [Apache 2.0 License](LICENSE).

Copyright (c) 2020 German Aerospace Center (DLR) * German Remote Sensing Data Center * Department: Geo-Risks and Civil Security




## Changelog

[Learn about the latest changes and features](CHANGELOG.md).




## Contributing

The UKIS team welcomes contributions from the community.
For more detailed information, see our [guide on contributing](CONTRIBUTING.md) and [development](DEVELOPMENT.md) if you're interested in getting involved.


