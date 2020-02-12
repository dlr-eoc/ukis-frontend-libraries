# Getting started 

- Check if [Git](https://git-scm.com/) is installed.
- Clone the repo: `git clone https://github.com/dlr-eoc/frontend-libraries.git` . 
- Check if [Node.js](https://nodejs.org/) and npm are installed.
- Move into project: `cd frontend-libraries`
- Create a new branch for your feature specific changes based on master: e.g. `git checkout -b feature-XXX`
- Install dependencies: `npm install`

## Note
- all versions in package.json should be fixed! 
- reserve time in sprint or before a sprint to upgrade versions and then to test and fix broken dependencies. (similar to hardware upgrades)
- check for new versions `npm outdated -l` and `ng update`




# Ho to create a new Project library (UKIS-Module)

### 1. Generate a new library with the cli
run ``ng generate library < name > --prefix ukis``

- rename lib package: "name": "@ukis/< name >"
- set version to: "version": "0.0.0-PLACEHOLDER"
- set lib package: "main": "src/public-api",
- add "license": "Apache-2.0" or a compatible licenses
- add path mapping to paths in the main tsconfig.json

### 2. Add and create Files
- create components and or services in the lib with the cli
- add missing exports to public_api.ts


### 3. Add Dependencies

[When my package depends on another package, should I put it in dependencies or peerDependencies?](https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f)

---

If your project depends on a package that is already listed in [frontend-libraries/package.json](https://github.com/dlr-eoc/frontend-libraries/package.json)
 - add that package as a peer dependency to your project-specific package.json. Use the version-placeholder (`0.0.0-PLACEHOLDER-VENDOR`) for those peer dependencies. If you use a library then use the version-placeholder (`0.0.0-PLACEHOLDER`)  Example: 
    ```
        // package.json
        // ...
        "peerDependencies": {
            "@angular/common": "0.0.0-PLACEHOLDER-VENDOR",
            "@angular/core": "0.0.0-PLACEHOLDER-VENDOR",
            "@angular/cdk": "0.0.0-PLACEHOLDER-VENDOR",
            "@clr/angular": "0.0.0-PLACEHOLDER-VENDOR",
            "@clr/icons": "0.0.0-PLACEHOLDER-VENDOR",
            "rxjs": "0.0.0-PLACEHOLDER-VENDOR",
            "md5": "0.0.0-PLACEHOLDER-VENDOR"
        },
        "dependencies":{
          "@ukis/services-layers": "0.0.0-PLACEHOLDER"
        }
        // ...
    ```
   This placeholder gets replaced with the versions of the main package.json on publish! [see scripts/library (setVersionsOfProjects)](scripts\library\index.ts)
 - list them in your project-specific ng-package.json as whitelistedNonPeerDependencies



### 4. Test your library
- create specs and run `ng test < name >`

### 5. Build your library locally
- build lib `ng build < name >`

### 4. update README and CHANGELOG
- add your library to the README
- add important/breaking changes to the CHANGELOG

# How to publish a new version of all projects
- make sure you have updated README and CHANGELOG and commit all your stuff.
- run `git pull` to get the latest changes.
- run `node scripts/library/index.js -c` to check if all dependencies are present. (node_modules must be installed for this)
- run `node scripts/library/index.js -t` to test all projects. (node_modules must be installed for this)
- run `node scripts/library/index.js -b` to test all projects are building locally. (node_modules must be installed for this)
- update the `version` parameter in the package.json in the root-directory (*not* in a single libraries package.json!) according to [Semantic Versioning](https://semver.org/)
- create a tag with the same version e.g `git tag -a v2.1.0 -m "Version after Sprint CoastalX II"` and push it to origin `git push origin v2.1.0`
- the jenkins-job `packaging-frontend-libraries` will discover the presence of a new tag. It will then build the packages and publish them with the new version to nexus.
- if everything is ok and you have worked on a branch, then merge your changes back into the master.

# Developing libraries and frontend side by side
Sometimes we want to work on a frontend-project and a library simultaneously. Such a situation might occur when during the work on a project an error is detected in one of the libraries that takes some work to fix. 
There are two ways to include libraries in a frontend-project: 

### 1st method: cloning libraries into your project
- clone the libraries directly into the project. In detail: 
    - in the root-directory of your application (say `/home/<-your-username-here->/project-<name>`) clone the libraries: `git clone http://<-your-username-here->@git.../frontend-libraries.git`
    - adjust the path mapping in  `project-<name>/tsconfig.json`, so that the ts-compiler will look for any `@ukis` dependencies in the libraries-directory you just downloaded: 
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

### 2nd method: build libraries and project side by side
- compile the library on changes and link the compiled library into the frontend-projects `node_modules/@ukis` directory. 

##### Building side by side - method 1: using ng build and npm link
- clone the libraries
- use `ng build --watch=true`
- `npm link ../frontend-libraries/dist/<projectname>` in your project

##### Building side by side - method 2: using `buildAndLink.sh`
We have provided a script for this purpose: `bash scripts/buildAndLink.sh <libraryName> <frontendProjectName>`. 
Note that this script assumes that the project- and the libraries-directories are placed side by side in the same folder.
For example, assume that the folders `frontend-libraries` and `project-mariss` are situated in the same directory. 
Then executing `bash frontend-libraries/buildAndLink.sh services-owc-json project-mariss` will build the library `frontend-libraries/projects/services-owc-json` and link it into `project-mariss/node_modules/@ukis/services-owc-json`.



# Usage of compodoc to generate documentation
[compodoc](https://github.com/compodoc/compodoc) is used to collect and render documentation from code for angular projects. 

### How compodoc works 

* definition of included source code in tsconfig.doc.json
* By default compodoc does not scan node_modules for source code to include into documentation. This behaviour cannot be changed without adapting compodocs code.
* A call to `npm run compodoc` will generate the documentation which is stored in folder documentation inside the project. This can be pushed to git, so that it can be browsed from there. 

### Writing documentation for compodoc

Compodoc use Typescript AST parser and it's internal APIs, so the comments have to be JSDoc comments. 
