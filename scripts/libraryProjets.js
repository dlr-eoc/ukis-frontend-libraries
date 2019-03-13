/**
* Get and set Version of Library projects from frontend-libraries
*
* arguments
* -l | --list
* -s | --set
*
* node scripts/projetsVersion.js -l
*/
var replace = require("replace");
var PATH = require('path');
var NG = require('@angular/cli');
var UKIS_SCOPE = '@ukis/';
var CWD = process.cwd();
var PLACEHOLDER = "0.0.0-PLACEHOLDER";
var MAINPACKAGE = require(PATH.join(CWD, 'package.json'));
var ANGULARJSON = require(PATH.join(CWD, 'angular.json'));
var getProjects = function () {
    var projects = [];
    Object.keys(ANGULARJSON.projects).forEach(function (project) {
        var _project = {
            name: project,
            path: PATH.join(CWD, ANGULARJSON.projects[project].root),
            package: PATH.join(CWD, ANGULARJSON.projects[project].root, 'package.json')
        };
        projects.push(_project);
    });
    return projects;
};
var dependencyGraph = function () {
    var projects = getProjects(), nodes = new Map();
    projects.forEach(function (project) {
        var projectPackage = require(project.package);
        var projectName = projectPackage.name;
        if (projectPackage.dependencies) {
            var projectDeps = Object.keys(projectPackage.dependencies).filter(function (key) { return key.indexOf(UKIS_SCOPE) != -1; });
            if (projectDeps.length > 0) {
                var _obj_1 = new Map();
                projectDeps.forEach(function (_dep) {
                    if (nodes.has(_dep)) {
                        _obj_1.set(_dep, nodes.get(_dep));
                    }
                    else {
                        _obj_1.set(_dep, null);
                    }
                });
                nodes.set(projectName, _obj_1);
            }
        }
        else {
            nodes.set(projectName, null);
        }
    });
    var flattGraph = [], deps = [];
    nodes.forEach(function (value, key) {
        if (value == null) {
            flattGraph.push(key);
        }
        else {
            //TODO check if in flattGraph and order 
            deps.push(key);
        }
    });
    flattGraph.push(deps);
    console.log(flattGraph);
    return nodes;
};
var runTests = function (offset) {
    if (offset === void 0) { offset = 0; }
    var projects = getProjects().map(function (item) { return item.name; });
    var project = projects[offset];
    var options = {
        cliArgs: ['test', '--watch=false', project]
    };
    if (project) {
        console.info(">>> run ng test " + project);
        NG["default"](options).then(function (result) {
            offset++;
            runTests(offset);
        });
    }
};
var runBuild2 = function (offset) {
    if (offset === void 0) { offset = 0; }
    var projects = getProjects().map(function (item) { return item.name; }), project;
    project = projects[offset];
    var options = {
        cliArgs: ['build', '--watch=false', project]
    };
    if (project) {
        console.info(">>> run ng build " + project);
        //TODO: check if all deps build before
        NG["default"](options).then(function (result) {
            offset++;
            runBuild2(offset);
        });
    }
};
var buildProject = function (project) {
    var options = {
        cliArgs: ['build', '--watch=false', project]
    };
    console.info(">>> run ng build " + project);
    //TODO: check if all deps build before
    return NG["default"](options);
};
var runBuilds = function () {
    var deps = dependencyGraph();
};
var setVersionsOfProjects = function () {
    var projectsPaths = getProjects().map(function (item) { return item.package; });
    var errors = listAllProjects(true);
    if (errors.length < 1 && MAINPACKAGE.version) {
        console.log(projectsPaths);
        replace({
            regex: PLACEHOLDER,
            replacement: MAINPACKAGE.version,
            paths: projectsPaths,
            recursive: true,
            silent: true,
            include: "package.json"
        });
        console.log("replaced all " + PLACEHOLDER + " with " + MAINPACKAGE.version);
    }
    else {
        console.log("check main package.json version and projects for errors!");
        console.table(errors);
    }
};
var listAllProjects = function (silent) {
    if (silent === void 0) { silent = false; }
    var projects = [], errors = [], projectsPaths = getProjects();
    projectsPaths.forEach(function (project) {
        var projectPackage = require(project.package);
        var _project = {
            name: projectPackage.name,
            version: projectPackage.version,
            error: false,
            dependencies: null
        };
        if (projectPackage.version != PLACEHOLDER) {
            var error = "version of project: " + projectPackage.name + " must be " + PLACEHOLDER + " for build!";
            if (!silent) {
                console.error(error);
            }
            _project.error = true;
            errors.push({ project: projectPackage.name, error: error });
        }
        if (projectPackage.name.indexOf(UKIS_SCOPE) == -1) {
            var error = "name of project: " + projectPackage.name + " must be prefixed with the " + UKIS_SCOPE + " namespace!";
            if (!silent) {
                console.error(error);
            }
            _project.error = true;
            errors.push({ project: projectPackage.name, error: error });
        }
        if (projectPackage.dependencies) {
            _project.dependencies = Object.keys(projectPackage.dependencies).join(',') || null;
            Object.keys(projectPackage.dependencies).forEach(function (key) {
                var dep = projectPackage.dependencies[key];
                if (key.indexOf(UKIS_SCOPE) != -1 && dep != PLACEHOLDER) {
                    var error = "version of dependency: " + key + " in project: " + projectPackage.name + " must be " + PLACEHOLDER + " for build!";
                    if (!silent) {
                        errors.push({ project: projectPackage.name, error: error });
                    }
                    _project.error = true;
                    errors.push(error);
                }
            });
        }
        projects.push(_project);
    });
    if (!silent) {
        console.table(projects);
    }
    return errors;
};
process.argv.slice(2).forEach(function (arg) {
    if (arg == '-l' || arg == '--list') {
        listAllProjects();
    }
    if (arg == '-s' || arg == '--set') {
        setVersionsOfProjects();
    }
    if (arg == '-t' || arg == '--test') {
        runTests();
    }
    if (arg == '-g' || arg == '--dg') {
        dependencyGraph();
    }
    if (arg == '-b' || arg == '--build') {
        runBuilds();
    }
});
