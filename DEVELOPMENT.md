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
- update versions `npm update <pkg>` and `ng update <pkg>`
- make angular migrations manually `ng update @angular/cli --from <version> --to <version> --migrate-only` and `ng update @angular/core --from <version> --to <version> --migrate-only`

## General Development Workflow

### Issues and Milestones
- Collect Ideas, then Sum them up to Issues which we can then sort into different [Milestones](https://github.com/dlr-eoc/ukis-frontend-libraries/milestones)
- Label Issues and use the [Commit Message Guidelines](https://github.com/dlr-eoc/ukis-frontend-libraries/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

### Branch and Fork
- Internally we use branches in the repository to create new features and bug fixes
- If you are not member of our organization fork our repository and use branches ([see our guide on contributing](https://github.com/dlr-eoc/ukis-frontend-libraries/blob/master/CONTRIBUTING.md))

**gh-pages branch:**
This branch is used to host some demo applications as GitHub Pages.
Do not push to it or adjust it manually, because it gets updated by a [GitHub Action gh-pages.yml](https://github.com/marketplace/actions/deploy-to-github-pages)


# Ho to create a new Project library (UKIS-Module)
The angular workspace was created by ``ng new < name > --create-application=false --prefix=ukis --style=scss`` with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

### 1. Generate a new library with the cli
run ``ng generate library < name > --prefix ukis``

- rename lib package: "name": "@dlr-eoc/< name >"
- set version to: "version": "0.0.0-PLACEHOLDER"
- set lib package: "main": "src/public-api",
- add "license": "Apache-2.0" or a compatible licenses
- remove the newly created path mapping in the main tsconfig.json because it is already done by `@dlr-eoc/*`

### 2. Add and create Files
- create components and or services in the lib with the cli
- add missing exports to public-api.ts

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
          "@dlr-eoc/services-layers": "0.0.0-PLACEHOLDER"
        }
        // ...
    ```
   This placeholder gets replaced with the versions of the main package.json on publish! [see scripts/library (setVersionsOfProjects)](scripts\library\index.ts)
 - list them in your project-specific ng-package.json as allowedNonPeerDependencies

### 4. Check if dependencies are correct in the package.json
- run `node scripts/library/index.js -c`

### 5. Test your library
- create specs and run `ng test < name >`

### 6. Build your library locally
- build lib `ng build < name >`

### 7. update README and CHANGELOG
- add your library to the README
- add important/breaking changes to the CHANGELOG







### Generate a new application with the cli
run ``ng g application < name > --prefix=app --style=scss``

# How to publish a new version for all projects
The general workflow to create a new version:
1. clone the repository and create a new branch for your feature specific changes based on master.
2. make sure you have updated CHANGELOG and README and commit all your stuff.
3. push your branch `git push origin <branch>` and check if the github actions test and build correctly.

#### further you can test and build locally
- run `node scripts/library/index.js -c` to check if all dependencies are present. (node_modules must be installed for this)
- run `node scripts/library/index.js -t` to test all projects. (node_modules must be installed for this)
- run `node scripts/library/index.js -b` to test all projects are building locally. (node_modules must be installed for this)

3. create a [pull request on the master](https://github.com/dlr-eoc/ukis-frontend-libraries/pulls)

## Then the UKIS Team will publish a new version
- based on the new master create a release branch e.g `git checkout -b release-v7.1.0`
- set version, date and description in the CHANGELOG.md e.g. `# [<version>](https://github.com/dlr-eoc/ukis-frontend-libraries/tree/v<version>) (<date>) (<description>)`
- update the `version` parameter in the main package.json for *ukis-frontend-libraries* according to [Semantic Versioning](https://semver.org/)
  by running `npm version <newversion> -m "Version after Milestone XY"` (major | minor | patch) [further see npm version](https://docs.npmjs.com/cli/version)
- merge the release branch in the master by making a pull request. Use `Create a merge commit` (not Squash and merge) so the created tag (all commits from this branch) will be added to the base branch via a merge commit.
- push the tag (created from `npm version`) `after the pull request is be merged` by running `git push origin --tags`
- If the tag is pushed after the pull request is merged, github actions will run the workflow [Package Main Release](.github/workflows/main-release-package.yml) and checks if the tag is included in the master. If this check works the jobs *test* , *build* and *publish* are execudeted and publish the angular projects as github/npm packages.

## Alternative prereleases can be created
Git tags in the following formats are allowed
- "v[0-9]+.[0-9]+.[0-9]+-alpha.[0-9]+"
- "v[0-9]+.[0-9]+.[0-9]+-beta.[0-9]+"
- "v[0-9]+.[0-9]+.[0-9]+-next.[0-9]+"

E.g. if the current npm version is `7.2.0` then you can create a `7.3.0-next.0`
You can check this with `[semver](https://github.com/npm/node-semver#readme) 7.2.0 -i prerelease --preid next`
Whereby after semantic versioning the following order exists: 7.2.0 < 7.3.0-alpha.0 < 7.3.0-beta.0 < 7.3.0-next.0

To create a new prerelease, you only have to create a new version from your current branch `npm version <prerelease> --preid=next -m "prerelease message"` (premajor | preminor | prepatch).
And then `git push origin --tags` which will trigger the [Pre Release](.github/workflows/pre-release-package.yml) workflow.
**Before doing this you should [locally test and build](#further-you-can-test-and-build-locally)!!!** to prevent failed workflows but created tags.


# Developing libraries and frontend side by side
Sometimes we want to work on a frontend-project and a library simultaneously. Such a situation might occur when during the work on a project an error is detected in one of the libraries that takes some work to fix. 
There are two ways to include libraries in a frontend-project: 

### 1st method: cloning libraries into your project
- clone the libraries directly into the project. In detail: 
    - in the root-directory of your application (say `/home/<-your-username-here->/project-<name>`) clone the libraries: `git clone http://<-your-username-here->@git.../frontend-libraries.git`
    - adjust the path mapping in  `project-<name>/tsconfig.json`, so that the ts-compiler will look for any `@dlr-eoc` dependencies in the libraries-directory you just downloaded: 
    ```
        // tsconfig.json
        ...
        "paths": {
            "@dlr-eoc/*": [
                "dist/*",
                "frontend-libraries/projects/*"
            ]
        }
        ...
    ```

### 2nd method: build libraries and project side by side
- compile the library on changes and link the compiled library into the frontend-projects `node_modules/@dlr-eoc` directory. 

##### Building side by side - method 1: using ng build and npm link
- clone the libraries
- use `ng build --watch=true`
- `npm link ../frontend-libraries/dist/<projectname>` in your project

##### Building side by side - method 2: using `buildAndLink.sh`
We have provided a script for this purpose: `bash scripts/buildAndLink.sh <libraryName> <frontendProjectName>`. 
Note that this script assumes that the project- and the libraries-directories are placed side by side in the same folder.
For example, assume that the folders `frontend-libraries` and `project-mariss` are situated in the same directory. 
Then executing `bash frontend-libraries/buildAndLink.sh services-owc-json project-mariss` will build the library `frontend-libraries/projects/services-owc-json` and link it into `project-mariss/node_modules/@dlr-eoc/services-owc-json`.



# How to install Packages from GitHub
1. [Create a personal access token on your github account](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with (read:packages, repo, write:packages)

2. Authenticate by logging in to GitHub npm Package Registry, use the npm login

`npm login --registry=https://npm.pkg.github.com` and use your personal access token as Password

3. Create a [.npmrc file](https://docs.npmjs.com/configuring-npm/npmrc.html) in your folder or use --registry=https://npm.pkg.github.com on npm install

```
// .npmrc
registry=https://registry.npmjs.org/
@dlr-eoc:registry=https://npm.pkg.github.com/dlr-eoc
```

for more information see [configuring-npm-for-use-with-github-packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)


# Usage of compodoc to generate documentation
[compodoc](https://github.com/compodoc/compodoc) is used to collect and render documentation from code for angular projects. 

### How compodoc works 

* definition of included source code in tsconfig.doc.json
* By default compodoc does not scan node_modules for source code to include into documentation. This behaviour cannot be changed without adapting compodocs code.
* A call to `npm run compodoc` will generate the documentation which is stored in folder documentation inside the project. This can be pushed to git, so that it can be browsed from there. 

### Writing documentation for compodoc

Compodoc use Typescript AST parser and it's internal APIs, so the comments have to be JSDoc comments. 
