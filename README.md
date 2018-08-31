# Frontend for UKIS Map Applications

This is an umbrella repository that hosts a boiler plate project demonstrating how to plug together modules for a new frontend map application. 
It uses [angular](https://angular.io/) and the [Clarity Design System](https://vmware.github.io/clarity/).
The dependencies to the needed modules are defined in package.json and are stored in node_modules.  

This repository consists of branches: 
- master: this is the core frontend consisting of core ui elements without any functionality (no map components included etc). This is the raw frame that can be filled with live for each project. 
- project-demo: branch based on master that demonstrates, how a frontend can look like. It is fully featured to showcase the usage of modules, how they are imported and referenced in ukis.component. Currently it includes: 
    - ol-map module
    - 3d-map module
    - mapcontrol and mapnavigator
    - layerentry and a layertree
    - test to use Ol4MapSvc directly in the app.component
    - user-info module
- project-mariss: branch based on master used for the mariss project. 


## Issues
 http://jira.ukis.eoc.dlr.de/issues/?jql=project%20%3D%20UKISDEV%20AND%20Component%20%3D%20Frontend%20AND%20Labels%20%3D%20master

## Getting started to develop
- Check if [Git](https://git-scm.com/) is installed.
- Clone the repo: `git clone http://git.ukis.eoc.dlr.de/scm/mofro/frontend.git` . 
- Create your own branch for your project based on master: 
```bash
     # go to cloned repo
     cd frontend
     # create local branch based on master
     git checkout -b project-XXX
     #push local branch to remote
     git push -u origin project-XXX
```
- Check if [Node.js](https://nodejs.org/) and npm is installed.
- Install dependencies: `npm install --registry http://hofer.eoc.dlr.de/nexus/content/groups/npm-all/`
- Start development server: `npm start`
- Check `localhost:4200/index.html`

## Merge changes from one branch to another
It is often the case that some features need to be merged from one branch to another (master is considered to be a branch).
```bash
   #checkout the branch you want to merge into
   git checkout A
   # get most recent changes from remote
   git pull origin A
   # deal with merge conflicts now if necessary
   # create local branch to do the merge
   git checkout -b merge-B-into-A
   # then merge the branch B into A
   git merge B
   # resolve with merge conflicts if necessary
   # test your application
   npm install
   npm start
   # check if compiler errors ocurr
   # check if aplication is working as expected
   # merge back changes to real branch A
   git checkout A
   git pull origin A #to be sure
   git merge merge-B-into-A
   # if no merge conflicts arouse, push changes. If conflicts are seen, resolve, test and push on success
   git pushorigin A
```

## Note
- all versions in package.json should be fixed! 
- reserve time in sprint or before a sprint to upgrade versions and then to test and fix broken dependencies. (similar to hardware upgrades)

## Usage of compodoc to generate documentation
[compodoc](https://github.com/compodoc/compodoc) is used to collect and render documentation from code for angular projects. 

### How compodoc works 

* definition of included source code in tsconfig.doc.json
* By default compodoc does not scan node_modules for source code to include into documentation. This behaviour cannot be changed without adapting compodocs code. As we import UKIS modules as dependencies via package.json, we use the project [git-dependencies](http://git.ukis.eoc.dlr.de/scm/admin/npm-git-dependencies.git) to download and store the UKIS sources to the folder doc_modules. This folder doc_modules is added to tsconfig.doc.json in 1 so that compodoc is able to screen it
* A call to `npm run compodoc` will generate the documentation which is stored in folder documentation inside the project. This can be pushed to git, so taht it can be browsed from there. 

### Writing documentation for compodoc

Compodoc use Typescript AST parser and it's internal APIs, so the comments have to be JSDoc comments. 




## Continuous Integration: Jenkins TODO

The [jenkins pipeline ukis-mofro_project-demo](http://torres.eoc.dlr.de/job/ukis-mofro_project-demo/) is defined for the branch project-demo to automatically build it. Then, it is automatically deployed to [duarte]() 

For all project branches such a pipeline can be created to ensure that breaking changes are discovered early.
