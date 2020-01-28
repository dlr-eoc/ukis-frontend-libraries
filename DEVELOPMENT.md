# Ho to create a new Project library (UKIS-Module)

### 1. Generate a new library with the cli
run ``ng generate library < name > --prefix ukis``

- rename lib package: "name": "@ukis/< name >"
- set version to: "version": "0.0.0-PLACEHOLDER"
- set lib package: "main": "src/public_api",
- add path mapping to paths in the main tsconfig.json

### 2. Add and create Files
- create components and or services in the lib wit the cli 
- add missing exports to public_api.ts


### 3. Add Dependencies

[When my package depends on another package, should I put it in dependencies or peerDependencies?](https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f)

---

- add peerDependencies for dependencies which are generally in the [frontend-libraries/package.json](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse/package.json)

- all @ukis dependencies from [frontend-libraries/projects](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse/projects) add to dependencies (with the version "0.0.0-PLACEHOLDER") and list them in the ng-package.json as whitelistedNonPeerDependencies (to build them correctly)

- add @ukis dependencies to whitelistedNonPeerDependencies in ng-package.json


### 4. Test your library
- create specs and run `ng test < name >`


### 5. Build your library locally
- build lib `ng build < name >` (the full build is done with a jenkins-job see below)


### 4. update README and CHANGELOG
- add your library to the README
- add important/Breaking changes to the CHANGELOG


# How to publish a new version of all projects
- make sure you have updated README and CHANGELOG and commit all your stuff.
- run `git pull` to get the latest changes.
- run `node scripts/libraryProjects.js -c` to check if all dependencies are present. (node_modules must be installed for this)
- run `node scripts/libraryProjects.js -t` to test all projects. (node_modules must be installed for this)
- run `node scripts/libraryProjects.js -b` to test all projects are building locally. (node_modules must be installed for this)
- update the `version` parameter in the package.json in the root-directory (*not* in a single libraries package.json!) according to [Semantic Versioning](https://semver.org/)
- create a tag with the same version e.g `git tag -a v2.1.0 -m "Version after Sprint CoastalX II"` and push it to origin `git push origin v2.1.0`
- the jenkins-job `packaging-frontend-libraries` will discover the presence of a new tag. It will then build the packages and publish them with the new version to nexus.
- if everything is ok and you have worked on a branch, then merge your changes back into the master.



# Developing libraries and frontend side by side
Sometimes we want to work on a frontend-project and a library simultaneously. Such a situation might occur when during the work on a project an error is detected in one of the libraries that takes some work to fix. 
There are two ways to include libraries in a frontend-project: 
 - 1st method: compile the library on changes and link the compiled library into the frontend-projects `node_modules/@ukis` directory. We have provided a script for this purpose: `bash scripts/buildAndLink <libraryName> <frontendProjectName>`. Note that this script assumes that the project- and the libraries-directories are placed side by side in the same folder. For example, assume that the folders `frontend-libraries` and `project-mariss` are situated in the same directory. Then executing `bash frontend-libraries/buildAndLink.sh services-owc-json project-mariss` will build the library `frontend-libraries/projects/services-owc-json` and link it into `project-mariss/node_modules/@ukis/services-owc-json`.
 - 2nd method: clone the libraries directly into the project. In detail: 
    - in the root-directory of your application (say `/home/<-your-username-here->/project-geoservice`) clone the libraries: `git clone http://<-your-username-here->@git.ukis.eoc.dlr.de/scm/mofro/frontend-libraries.git`
    - adjust the path mapping in  `project-geoservice/tsconfig.json`, so that the ts-compiler will look for any `@ukis` dependencies in the libraries-directory you just downloaded: 
```
    // tsconfig.json
    ...
    "paths": {
        "@ukis/*": [
            "dist/*",
            "frontend-libraries/projects/*"
        ]
    }
    ...
```