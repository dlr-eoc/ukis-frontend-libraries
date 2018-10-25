# Ho to create a new Project based on the master branch

1. If you already cloned the project, create a new branch:
```bash
git checkout -b project-XXX
```

2. If you want to use some of the [UKIS-Modules](http://git.ukis.eoc.dlr.de/projects/MOFRO) include them in your package.json like described in the modules itself e.g [ol-map](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/map_ol4/browse).

3. Run ``npm install --registry http://hofer.eoc.dlr.de/nexus/content/groups/npm-all/ `` and check if everything is working with ``npm start``. If you get some errors from the compiler and you have included ukis-modules, try to run ``npm run gitDependencies`` (see [npm-git-dependencies](http://git.ukis.eoc.dlr.de/projects/ADMIN/repos/npm-git-dependencies/browse)) and ``npm start`` again.
Then check ``localhost:4200/index.html`` where the dev-server is normally listening.

## Folder Structure 
- to check out the folders see the [angular documentation](https://angular.io/guide/quickstart#the-src-folder)
- all of the ukis-modules are installed to ``node_modules/@ukis/`` and are includet to the typeScript compiler [see the tsconfig](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend/browse/src/tsconfig.app.json) //this is normally not recommended but makes development of multiple modules faster.
- New components are placed in
    - src/app/components //all components (custom elements) which you insert in the HTML
    - src/app/route-components //all routes (pages) that you can access in the client via the URL
- The routes are configured via src/app/app-routing.module.ts


## Create new Components
- to create new things use [ng-cli](https://github.com/angular/angular-cli/wiki) e.g.

```bash
//new component(element)
ng generate component components/awesome-element
```
or
```bash
//new route (page)
ng generate component route-components/awesome-route
```

# Development of UKIS-Modules
[git Cheat Sheet](https://wiki.dlr.de/display/DFDGZS/Git+Cheat+Sheet)

when developing UKIS-Modules like [ol-map](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/map_ol4/browse) you should always use git tags to fix a certain state of the Module.
- show all tags: `git tag`
- create tag: e.g. `git tag -a v0.1.2 -m "version 0.1.2 bugfix"`
- push tag to remote: `git push origin v0.1.2`

every Module should have a branch named publish which is register on the Jenkins Pipeline to publish packages on Hofer


