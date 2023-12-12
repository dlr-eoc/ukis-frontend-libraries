# Getting started 

- Check if [Git](https://git-scm.com/) is installed
- Check if [Node.js](https://nodejs.org/) and npm are installed
- Clone the repo: `git clone https://github.com/dlr-eoc/frontend-libraries.git` 
- Move into project: `cd frontend-libraries`
- Install dependencies: [`npm install`](https://docs.npmjs.com/cli/commands/npm-install) or [`npm ci`](https://docs.npmjs.com/cli/commands/npm-ci)
- Dependencies are managed in [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) check how to use them
- Create a new branch for your feature specific changes based on the main branch: e.g. `git checkout -b feature-XXX`

## Update dependencies
- reserve time in sprint or before a sprint to upgrade versions and then to test and fix broken dependencies.
- check for new versions [`npm outdated -l`](https://docs.npmjs.com/cli/commands/npm-outdated) and [`ng update`](https://angular.io/cli/update)
- update versions [`npm update <pkg>`](https://docs.npmjs.com/cli/commands/npm-update) and `ng update <pkg>`
- make angular migrations manually if needed `ng update @angular/cli --from <version> --to <version> --migrate-only` and `ng update @angular/core --from <version> --to <version> --migrate-only`
- an update of a `major` version in the dependencies should introduce a **BREAKING CHANGE!**

**The versions of the dependencies which are listed in root package.json will be shared with all projects**
**After you update something in root package.json (package version or dependencies) run the script `node scripts/library/index.js --set-source` to sync all versions with the projects and also run `npm install` to regenerate `package-lock.json`.**

This is used to sync "peerDependencies" across all workspaces but also to set the versions of other dependencies and the package version itself.

## General Development Workflow

### Issues and Milestones
- Collect Ideas, then sum them up to Issues which we can then sort into different [Milestones](https://github.com/dlr-eoc/ukis-frontend-libraries/milestones)
- Label Issues and use the [Commit Message Guidelines](https://github.com/dlr-eoc/ukis-frontend-libraries/blob/main/CONTRIBUTING.md#-commit-message-guidelines)

### Branch and Fork
- Internally we use branches in the repository to create new features and bug fixes
- If you are not member of our organization fork our repository and ([see the guide on contributing](https://github.com/dlr-eoc/ukis-frontend-libraries/blob/main/CONTRIBUTING.md))

**gh-pages branch:**
This branch is used to host some demo applications as GitHub Pages.
Do not push to it or adjust it manually, because it gets updated by a [GitHub Action gh-pages.yml](https://github.com/marketplace/actions/deploy-to-github-pages)


# Ho to create a new Project library (UKIS-Module)
The angular workspace was created by ``ng new <name> --create-application=false --prefix=ukis --style=scss`` with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

### 1. Generate a new library with the cli
run ``ng generate library <name> --prefix ukis``

- rename lib package: "name": "`@dlr-eoc/<name>`"
- set version to the same as in the root package.json
- set lib package: "main": "src/public-api",
- add "license": "Apache-2.0" or a compatible licenses
- add "author": "Team UKIS"
- add "description" for the package
- add "keywords"
- remove the newly created path mapping in the main tsconfig.json because it is already done by `@dlr-eoc/*`

### 2. Add it to npm workspaces
run ``npm init -w ./projects/<angular-project-name>``

Same name used in ``ng generate library <name>``.

### 3. Add and create Files
- create components and or services in the lib with the cli
- add missing exports to public-api.ts

### 4. Add Dependencies

[When my package depends on another package, should I put it in dependencies or peerDependencies?](https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f)

---

1. If your project depends on a package that is already listed in [frontend-libraries/package.json](https://github.com/dlr-eoc/frontend-libraries/package.json) add that package as a peer dependency to your project-specific package.json and use the same version as in the root package. 
 
If you use a library (@dlr-eoc/...) then use the current version of frontend-libraries.

Example: 
    ```
        // package.json
        // ...
        "peerDependencies": {
            "@angular/common": "<main version>",
            "@angular/core": "<main version>",
            "@angular/cdk": "<main version>",
            "@clr/angular": "<main version>",
            "@clr/icons": "<main version>",
            "rxjs": "<main version>",
            "md5": "<main version>"
        },
        "dependencies":{
          "@dlr-eoc/services-layers": "*"
        }
        // ...
    ```
   This placeholder gets replaced with the versions of the main package.json on publish! [see scripts/library (setVersionsOfProjects)](scripts\library\index.ts)
 - list them in your project-specific ng-package.json as allowedNonPeerDependencies

2. If your project depends on a package not listed in `frontend-libraries/package.json` add it to the project-specific package.json.


### 5. Check if dependencies are correct in the package.json
- run `node scripts/library/index.js -c` 

This is running [depcheck](https://github.com/depcheck/depcheck#depcheck) with some configuration. For more information see `checkDeps()` in [ukis-libraries-scripts](scripts/library/README.md)

### 6. Test your library
- create specs and run `ng test <name>`
- to only run a few test use [fdescribe](https://jasmine.github.io/api/edge/global.html#fdescribe) and [fit](https://jasmine.github.io/api/edge/global.html#fit) temporarily.

### 7. Build your library locally
If the library does not depend on other libraries from the projects run
- build lib `ng build <name>`

If it depends on one
- `node scripts/library/index.js -b --projects <name>`

### 8. Update README and CHANGELOG
- add your library to the README
- add important/breaking changes to the CHANGELOG


### 9. Add examples for library to demo maps
- create new route module `ng generate module route-components/<route-example-modulename> --project=demo-maps`
- create new route component `ng generate component route-components/<route-example-componentname> --inline-style=false --inline-template=false --project=demo-maps --module=<route-example-modulename>`
- add dependencies to `demo-maps/package.json`
- see the library readme for how to update the component.
- see [angular Lazy-loading](https://angular.io/guide/lazy-loading-ngmodules) how to add imports and split code into modules. See also other route examples modules like `route-example-cesium` or `route-example-layers`.
- add new route to `app-routing.module.ts`


### Generate a new application with the cli
run ``ng g application <name> --prefix=app --style=scss``

# How to publish a new version for all projects
The general workflow to create a new version:
1. clone the repository and create a new branch for your feature specific changes based on the main branch.
2. make sure you have updated CHANGELOG and README and commit all your stuff.
3. push your branch `git push origin <branch>` and check if the github actions test and build correctly.

#### Further you can test and build locally
- run `node scripts/library/index.js -c` to check if all dependencies are present. (node_modules must be installed for this)
- run `node scripts/library/index.js -t` to test all projects. (node_modules must be installed for this)
- run `node scripts/library/index.js -b` to test all projects are building locally. (node_modules must be installed for this)

4. create a [release pull request](https://github.com/dlr-eoc/ukis-frontend-libraries/pulls) on the main branch.

## Release pull request [see release_pull_request.md](.github/PULL_REQUEST_TEMPLATE/release_pull_request.md)
- based on the new main branch create a release branch e.g `git checkout -b release-v7.1.0`
- set version, date and description in the CHANGELOG.md e.g. `# [<version>](https://github.com/dlr-eoc/ukis-frontend-libraries/tree/v<version>) (<date>) (<description>)`
- update the `version` parameter in the main package.json for *ukis-frontend-libraries* according to [Semantic Versioning](https://semver.org/)
  by running `npm version <newversion> -m "Version after Milestone XY" --workspace=projects --include-workspace-root` (major | minor | patch) [further see npm version](https://docs.npmjs.com/cli/version). Optionally test this by appending `--no-git-tag-version`.
- run `node scripts/library/index.js --set-source` to sync all versions.
- run `npm install` to update the main package-lock.json
- merge the release branch in the main branch by making a pull request (by appending the query param `template` to the PR url e.g. `https://github.com/dlr-eoc/ukis-frontend-libraries/compare/main...release-v8.0.1?template=release_pull_request.md` the PR body is populated with the template)
- push the tag (created from `npm version`) by running `git push origin --tags`
- set the label of the release PR to 'RELEASE'

Changes on the PR trigger the workflow [Package Main Release](.github/workflows/package-main-release.yml). The workflow comtains these jobs in this order: 
1. [checkHeadBranch](.github/workflows/package-main-release.yml#L14)
2. [checkTitelTag](.github/workflows/package-main-release.yml#L23)
3. [checkTagOnNpm](.github/workflows/package-main-release.yml#L59)
4. [checkLabel](.github/workflows/package-main-release.yml#L103)

Therefore it is important to meet the requirements of the jobs, as described in the [release_pull_request.md](.github/PULL_REQUEST_TEMPLATE/release_pull_request.md). If all jobs succeed the angular projects are published as github/npm packages.


## Alternative prereleases can be created
Git tags in the following formats are allowed
- "v[0-9]+.[0-9]+.[0-9]+-alpha.[0-9]+"
- "v[0-9]+.[0-9]+.[0-9]+-beta.[0-9]+"
- "v[0-9]+.[0-9]+.[0-9]+-next.[0-9]+"

E.g. if the current npm version is `7.2.0` then you can create a `7.3.0-next.0`
You can check this with `[semver](https://github.com/npm/node-semver#readme) 7.2.0 -i prerelease --preid next`
Whereby after semantic versioning the following order exists: 7.2.0 < 7.3.0-alpha.0 < 7.3.0-beta.0 < 7.3.0-next.0

To create a new prerelease, you only have to create a new version from your current branch 
- `npm version <prerelease> --preid=next -m "prerelease message" --workspace=projects --include-workspace-root` (premajor | preminor | prepatch).
- run `node scripts/library/index.js --set-source` to sync all versions.
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
  - add `frontend-libraries` to `.gitignore` so you do not commit it unintentionally to your code.
  - temporarily add all missing dependencies from `frontend-libraries` in your project's package.json (so you have all dependencies installed which the project needs for the transpilation)
  - check that the tsconfig file from your project is compatible with that of `frontend-libraries`
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
