# Ho to create a new Project library

### 1. Generate a new library with the cli
run ``ng generate library < name > --prefix ukis``

- rename lib package: "name": "@ukis/< name >"
- set version to: "version": "0.0.0-PLACEHOLDER"
- set lib package: "main": "src/public_api",

### 2. Add and create Files
- create components and or services in the lib wit the cli 
- add missing exports to public_api.ts


### 3. Add Dependencies
- add peerDependencies for dependencies which are generally in the [project-frontend/package.json](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/project-frontend/browse/package.json)

- all @ukis dependencies from [frontend-libraries/projects](http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/browse/projects) add to dependencies (with the version "0.0.0-PLACEHOLDER") and list them in the ng-package.json as whitelistedNonPeerDependencies (to build them correctly)


### 4. Test your library
- create specs and run `ng test < name >`


### 5. Build your library
- build lib `ng build < name >`


### 4. update README and CHANGELOG
- add your library to the README
- add important/Breaking changes to the CHANGELOG