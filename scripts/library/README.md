# ukis-libraries-scripts

This package contains a few scripts to build and test angular libraries.

It is based on [depcheck](https://github.com/depcheck/depcheck) and [toposort](https://github.com/marcelklehr/toposort#readme)

It uses the package scope `@dlr-eoc`, `main package.json` and the angular config file `angular.json`.


- To get the list of all projects it reads the angular config file (angular.json).
- To check all dependencies it uses the package scope `@dlr-eoc` and `depcheck`.
- To get the build order it uses `depcheck` and `toposort`.
- To run build and test it uses `await NG.default(options)` in a child process for each project.


**Functionality:**
- List all projects
- List all projects in a table with dependencies
- List all projects with dependencies and peerDependencies

- Set versions of all projects in dist folder
- Set versions of all projects in source (projects) folder
- Show a dependency graph
- Check if all dependencies are listed in the package.json of the project

- Run ng test for all projects
- Run ng build for all projects (with toposort dependencies)

Check help `node index.js -h` for more information.
