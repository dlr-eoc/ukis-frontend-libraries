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
- add peerDependencies for dependencies which are generally in the [project-frontend/package.json](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/project-frontend/browse/package.json)

- all @ukis dependencies from [frontend-libraries/projects](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse/projects) add to dependencies (with the version "0.0.0-PLACEHOLDER") and list them in the ng-package.json as whitelistedNonPeerDependencies (to build them correctly)


### 4. Test your library
- create specs and run `ng test < name >`


### 5. Build your library locally
- build lib `ng build < name >` (the full build is done with a jenkins-job see below)


### 4. update README and CHANGELOG
- add your library to the README
- add important/Breaking changes to the CHANGELOG


# How to publish a new version of all projects
- make sure you have updated README and CHANGELOG and commit all your stuff.
- run `node scripts/libraryProjets.js -c` to check if all dependencies are present. (node_modules must be installed for this)
- run `node scripts/libraryProjets.js -t` to test all projects. (node_modules must be installed for this)
- run `node scripts/libraryProjets.js -b` to test all projects are building locally. (node_modules must be installed for this)
- update the `version` parameter in the package.json in the root-directory (*not* in a single libraries package.json!) according to [Semantic Versioning](https://semver.org/)
- create a tag with the same version and push it to origin
- the jenkins-job `packaging-frontend-libraries` will discover the presence of a new tag. It will then build the packages and publish them with the new version to nexus.
- if everything is ok and you have worked on a branch, then merge your changes back into the master.



