# Frontend for UKIS Map Applications

This repository consists of branches: 
- master: this is the core frontend consisting of core ui elements without any functionality (no map components included etc)
- project-demo: branch based on master that demonstrates, how a frontend can look like, fully featured to showcase the usage of components
- project-mariss: branch based on master used for the mariss project. 
- project-XXX: every new project branches from master and can merge features from master into its own branch. 



includes:
- ol-map module
- 3d-map module
- mapcontrol and mapnavigator
- layerentry and a layertree
- test to use Ol4MapSvc directly in the app.component
- user-info module

All UKIS dependencies are listed in package.json and are stored in node_modules. 


## Getting started
- Check if [Git](https://git-scm.com/) is installed.
- Clone the repo: `git clone http://git.ukis.eoc.dlr.de/scm/mofro/ui-core.git`
- Check if [Node.js](https://nodejs.org/) and npm is installed.
- Install dependencies: `npm install`

- Start development server: `npm start`
- Check `localhost:4200/index.html`


## Usage of compodoc to generate documentation
[compodoc](https://github.com/compodoc/compodoc) is used to collect and render documentation for angular projects. 

### How compodoc works 

* definition of included source code in tsconfig.doc.json
* By default compodoc does not scan node_modules for source code to include into documentation. This behaviour cannot be changed without adapting compodocs code. As we import UKIS modules as dependencies via package.json, we use the project [git-dependencies](http://git.ukis.eoc.dlr.de/scm/admin/npm-git-dependencies.git) to download and store the UKIS sources to the folder doc_modules. This folder doc_modules is added to tsconfig.doc.json in 1 so that compodoc is able to screen it
* A call to `npm run compodoc` will generate the documentation which is stored in folder documentation inside the project. This can be pushed to git, so taht it can be browsed from there. 

### Writing documentation for compodoc

Compodoc use Typescript AST parser and it's internal APIs, so the comments have to be JSDoc comments. 

# Core Elements of the UKIS-UI
- consists of [angular](https://angular.io/) and the [Clarity Design System](https://vmware.github.io/clarity/)


## Note
- all versions in package.json should be fixed! 
- reserve time in sprint or before a sprint to upgrade versions and then to test and fix broken dependencies. (similar to hardware upgrades)


## [DEMO]
