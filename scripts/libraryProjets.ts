import { RecursiveTreeNodeModel } from "@clr/angular/data/tree-view/models/recursive-tree-node.model";
import { never } from "rxjs";

/**
* Get and set Version of Library projects from frontend-libraries
*
* node scripts/projetsVersion.js -l
*/

const replace = require("replace");
const PATH = require('path');
const NG = require('@angular/cli');
const UKIS_SCOPE = '@ukis/';

const CWD = process.cwd();
const PLACEHOLDER = "0.0.0-PLACEHOLDER";
const MAINPACKAGE = require(PATH.join(CWD, 'package.json'));
const ANGULARJSON = require(PATH.join(CWD, 'angular.json'));

const toposort = require('toposort');

var getProjects = () => {
    let projects = [];

    Object.keys(ANGULARJSON.projects).forEach((project) => {
        let _project = {
            name: project,
            path: PATH.join(CWD, ANGULARJSON.projects[project].root),
            package: PATH.join(CWD, ANGULARJSON.projects[project].root, 'package.json')
        };
        projects.push(_project);
    })
    return projects;
};

var dependencyGraph = () => {
    let projects = getProjects(), nodesmap: Map<string, any> = new Map(), edges: [string, string][] = [], nodes: string[] = [];
    projects.forEach((project) => {
        let projectPackage = require(project.package);
        let projectName = projectPackage.name.replace(UKIS_SCOPE, '');
        nodes.push(projectName)
        if (projectPackage.dependencies) {
            let projectDeps = Object.keys(projectPackage.dependencies).filter((key) => key.indexOf(UKIS_SCOPE) != -1).map(key => key.replace(UKIS_SCOPE, ''));
            if (projectDeps.length > 0) {
                let _obj: Map<string, any> = new Map();
                projectDeps.forEach((_dep) => {
                    if (nodesmap.has(_dep)) {
                        _obj.set(_dep, nodesmap.get(_dep));
                    } else {
                        _obj.set(_dep, null);
                    }
                    edges.push([_dep, projectName])
                })
                nodesmap.set(projectName, _obj);
            }
        } else {
            nodesmap.set(projectName, null)
        }
    });
    return { edges, nodes, nodesmap };
};



var runTests = (offset = 0, projects) => {
    let project = projects[offset];
    let options = {
        cliArgs: ['test', '--watch=false', project]
    };

    if (project) {
        console.info(`>>> run ng test ${project}`)
        NG.default(options).then((result) => {
            offset++
            runTests(offset, projects);
        })
    }
};

var testAll = () => {
    let flattdeps = getProjects().map(item => item.name);
    runTests(0, flattdeps);
};

var runBuilds = (offset = 0, projects) => {
    let project = projects[offset];

    let options = {
        cliArgs: ['build', '--watch=false', project]
    };

    if (project) {
        console.info(`>>> run ng build ${project}`)
        //TODO: check if all deps build before
        NG.default(options).then((result) => {
            offset++
            runBuilds(offset, projects);
        })
    }
};


var buildAll = () => {
    let deps = dependencyGraph();
    let flattdeps = toposort.array(deps.nodes, deps.edges);
    runBuilds(0, flattdeps);
};

var setVersionsOfProjects = () => {
    let projectsPaths = getProjects().map(item => item.package);
    let errors = listAllProjects(true);
    if (errors.length < 1 && MAINPACKAGE.version) {
        console.log(projectsPaths)
        replace({
            regex: PLACEHOLDER,
            replacement: MAINPACKAGE.version,
            paths: projectsPaths,
            recursive: true,
            silent: true,
            include: "package.json"
        })
        console.log(`replaced all ${PLACEHOLDER} with ${MAINPACKAGE.version}`);
    } else {
        console.log(`check main package.json version and projects for errors!`)
        console.table(errors)
    }
};

var listAllProjects = (silent = false) => {
    let projects = [], errors = [], projectsPaths = getProjects();

    projectsPaths.forEach((project) => {
        let projectPackage = require(project.package);
        let _project = {
            name: projectPackage.name,
            version: projectPackage.version,
            error: false,
            dependencies: null
        };

        if (projectPackage.version != PLACEHOLDER) {
            let error = `version of project: ${projectPackage.name} must be ${PLACEHOLDER} for build!`;
            if (!silent) {
                console.error(error);
            }
            _project.error = true;
            errors.push({ project: projectPackage.name, error: error })
        }

        if (projectPackage.name.indexOf(UKIS_SCOPE) == -1) {
            let error = `name of project: ${projectPackage.name} must be prefixed with the ${UKIS_SCOPE} namespace!`;
            if (!silent) {
                console.error(error);
            }
            _project.error = true;
            errors.push({ project: projectPackage.name, error: error })
        }

        if (projectPackage.dependencies) {
            _project.dependencies = Object.keys(projectPackage.dependencies).join(',') || null;

            Object.keys(projectPackage.dependencies).forEach((key) => {
                let dep = projectPackage.dependencies[key];
                if (key.indexOf(UKIS_SCOPE) != -1 && dep != PLACEHOLDER) {
                    let error = `version of dependency: ${key} in project: ${projectPackage.name} must be ${PLACEHOLDER} for build!`;
                    if (!silent) {
                        errors.push({ project: projectPackage.name, error: error })
                    }
                    _project.error = true;
                    errors.push(error)
                }
            })
        }
        projects.push(_project)
    })
    if (!silent) {
        console.table(projects)
    }

    return errors;
};

process.argv.slice(2).forEach((arg: any) => {
    if (arg == '-l' || arg == '--list') {
        listAllProjects();
    }
    if (arg == '-s' || arg == '--set') {
        setVersionsOfProjects();
    }
    if (arg == '-t' || arg == '--test') {
        testAll();
    }
    if (arg == '-g' || arg == '--depGraph') {
        dependencyGraph();
    }
    if (arg == '-b' || arg == '--build') {
        buildAll();
    }
    if (arg == '-h' || arg == '--help') {
        console.log(`
Syntax:   node libraryProjets [options]

Options:
-h, --help              Print this message.
-l, --list              List all project in a table                    
-s, --set               Set versions of all projects
-g, --depGraph          Show a dependency graph
-t, --test              Run ng test for all projects
-b, --build             Run ng build fal all projects with toposort dependencies`)
    }
})



