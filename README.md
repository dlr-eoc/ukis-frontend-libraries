# Frontend Libraries for UKIS (Map) Applications

This is a repository that hosts all libraries that are imported into project specific UKIS Frontend Applications. 
It uses [angular](https://angular.io/) and the [Clarity Design System](https://vmware.github.io/clarity/).
The dependencies to the needed modules are defined in package.json and are stored in node_modules.  

This repository contains the following modules as angular libraries:
- datatypes
     - layers
     - map-state
     - owc-json
     - user-info
- services
     - layers
     - map-state
     - owc-json
     - util-store
- base-layers
     - raster
- map-ol
- layer-control
- map-navigator
- observation-explorer
- dataset-explorer
- user-info
- cookie-alert

To use the libraries in your project specific application, you can ather use the npm modules or include this repository.
- check the README of [project-frontend](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/project-frontend/browse/README.md)
- Use the frontend-libraries as npm modules 
- or Use the typescript modules for frontend-libraries instead of npm modules



## Issues
 http://jira.ukis.eoc.dlr.de/issues/?jql=project%20%3D%20UKISDEV%20AND%20Component%20%3D%20Frontend%20AND%20Labels%20%3D%20master

## Getting started to develop
- Check if [Git](https://git-scm.com/) is installed.
- Clone the repo: `git clone http://git.ukis.eoc.dlr.de/scm/mofro/frontend-libraries.git` . 
- Check if [Node.js](https://nodejs.org/) and npm is installed.

- Create your own branch for your project specific changes based on master: 
```bash
     # go to cloned repo
     cd frontend-libraries
     # create local branch based on master
     git checkout -b project-XXX
     #push local branch to remote
     git push -u origin project-XXX
```
- Install dependencies: `npm install`
- [see development documentation for further instructions](DEVELOPMENT.md)



## Note
- all versions in package.json should be fixed! 
- reserve time in sprint or before a sprint to upgrade versions and then to test and fix broken dependencies. (similar to hardware upgrades)

## Usage of compodoc to generate documentation (outdated)
[compodoc](https://github.com/compodoc/compodoc) is used to collect and render documentation from code for angular projects. 

### How compodoc works 

* definition of included source code in tsconfig.doc.json
* By default compodoc does not scan node_modules for source code to include into documentation. This behaviour cannot be changed without adapting compodocs code. As we import UKIS modules as dependencies via package.json, we use the project [git-dependencies](http://git.ukis.eoc.dlr.de/scm/admin/npm-git-dependencies.git) to download and store the UKIS sources to the folder doc_modules. This folder doc_modules is added to tsconfig.doc.json in 1 so that compodoc is able to screen it
* A call to `npm run compodoc` will generate the documentation which is stored in folder documentation inside the project. This can be pushed to git, so taht it can be browsed from there. 

### Writing documentation for compodoc

Compodoc use Typescript AST parser and it's internal APIs, so the comments have to be JSDoc comments. 


## Continuous Integration: Jenkins (in progress)

The [jenkins pipeline ukis-mofro_master](http://torres.eoc.dlr.de/job/ukis-mofro_master/) is defined for the branch master to automatically build it. Then, it is automatically deployed to [duarte](//duarte.eoc.dlr.de/master/) 

For all project branches such a pipeline can be created to ensure that breaking changes are discovered early.
