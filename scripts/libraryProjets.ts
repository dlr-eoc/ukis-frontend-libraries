import { RecursiveTreeNodeModel } from "@clr/angular/data/tree-view/models/recursive-tree-node.model";
import { never } from "rxjs";
import { ignoreElements } from "rxjs/operators";

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
const depcheck = require('depcheck');

interface Iprojects {
    name: string,
    path: string,
    package: string,
    testable: boolean
    buildable: boolean
}

interface Idep {
    key: string,
    value: string[],
    project: string
}

function getProjects() {
    let projects: Iprojects[] = [];

    Object.keys(ANGULARJSON.projects).forEach((project) => {
        let __project = ANGULARJSON.projects[project];
        let _project = {
            name: project,
            path: PATH.join(CWD, __project.root),
            package: PATH.join(CWD, __project.root, 'package.json'),
            testable: (__project.architect && __project.architect.test) ? true : false,
            buildable: (__project.architect && __project.architect.build) ? true : false,
        };
        projects.push(_project);
    })
    return projects;
};

function dependencyGraph() {
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

function runDependencyGraph() {
    console.log(dependencyGraph().nodesmap);
}

function checkDeps() {
    console.log(`>>> run check dependencies for projects`)
    let projectsPaths = getProjects(), promises: Promise<{}>[] = [];

    const options = {
        ignoreBinPackage: false, // ignore the packages with bin entry
        skipMissing: false, // skip calculation of missing dependencies
        ignoreDirs: [ // folder with these names will be ignored
            'dist'
        ],
        ignoreMatches: [ // ignore dependencies that matches these globs
        ],
        parsers: { // the target parsers
            //'*.js': depcheck.parser.es6,
            //'*.jsx': depcheck.parser.jsx
            '*.ts': depcheck.parser.typescript
        },
        detectors: [ // the target detectors
            depcheck.detector.requireCallExpression,
            depcheck.detector.importDeclaration
        ],
        specials: [ // the target special parsers
            depcheck.special.eslint,
            depcheck.special.webpack
        ],
        json: true
    };

    var filterFiles = (dep, project) => {
        let keys = Object.keys(dep),
            _dep: Idep;

        if (keys.length) {
            for (let key of keys) {
                let depsarray = dep[key].filter(item => item.indexOf('test.ts') == -1 && item.indexOf('.spec.ts') == -1);
                if (depsarray.length) {
                    _dep = {
                        project: project,
                        key: key,
                        value: depsarray
                    }
                    return _dep
                } else {
                    return false;
                }
            }
        }
    }

    var aysncdepcheck = (item: Iprojects) => {
        return new Promise((resolve, reject) => {
            depcheck(item.path, options, (unused) => {
                let missing = filterFiles(unused.missing, item.name)
                if (!missing) {
                    resolve(missing)
                } else {
                    resolve(missing)
                }
                //console.log('unused.dependencies', unused.dependencies); // an array containing the unused dependencies
                //console.log('unused.devDependencies', unused.devDependencies); // an array containing the unused devDependencies
                //console.log('unused.missing', unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
                //console.log('unused.using', unused.using); // a lookup indicating each dependency is used by which files
                //console.log('unused.invalidFiles', unused.invalidFiles); // files that cannot access or parse
                //console.log('unused.invalidDirs', unused.invalidDirs); // directories that cannot access
            });
        });
    };

    projectsPaths.forEach((item) => {
        promises.push(aysncdepcheck(item));
    });

    return Promise.all(promises).then(result => {
        let _result = result.filter(item => item)
        if (_result.length) {
            return _result;
        } else {
            console.log('no missing dependencies detected :)')
            return false;
        }
    });
};

function runCheckDeps() {
    checkDeps().then((result) => {
        if (result) {
            console.log(result)
        }
    })
}

function runTests(offset = 0, projects) {
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

function testAll() {
    let flattdeps = getProjects().filter(item => item.testable).map(item => item.name);
    runTests(0, flattdeps);
};

function runBuilds(offset = 0, projects) {
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


function buildAll() {
    checkDeps().then((result) => {
        /** build ony if there are no missing deps */
        if (result) {
            throw new Error(`check for missing dependencies ${result}`)
        } else {
            let deps = dependencyGraph();
            let flattdeps = toposort.array(deps.nodes, deps.edges);
            runBuilds(0, flattdeps);
        }
    })
};

function setVersionsOfProjects() {
    let projectsPaths = getProjects().map(item => item.package);
    let errors = projectsAndDependencies(true);
    if (errors.length < 1 && MAINPACKAGE.version) {
        //console.log(projectsPaths)
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

function listAllProjects() {
    let projectsPaths = getProjects();
    let list = projectsPaths.reduce((p, n) => {
        return p + '- ' + n.name + '\n';
    }, '');
    console.log(list);
}

function projectsAndDependencies(silent = false) {
    let projects: { name: string, version: string, error: boolean, dependencies: string }[] = [],
        errors: { project: string, error: string }[] = [],
        projectsPaths = getProjects();

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
                    errors.push({ project: projectPackage.name, error: error })
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

function showHelp() {
    console.log(`
Syntax:   node libraryProjets [options]

Options:
-h, --help              Print this message.
-l, --list              List all projects
-d, --deps              List all projects in a table with dependencies                   
-s, --set               Set versions of all projects
-g, --graph             Show a dependency graph
-c, --check             Check if all dependencies are listed in the package.json of the project
-t, --test              Run ng test for all projects
-b, --build             Run ng build fal all projects with toposort dependencies`);
}

let args = process.argv.slice(2);
args.forEach((arg) => {
    if (arg == '-h' || arg == '--help') {
        showHelp();
    } else if (arg == '-l' || arg == '--list') {
        listAllProjects();
    } else if (arg == '-d' || arg == '--deps') {
        projectsAndDependencies();
    } else if (arg == '-s' || arg == '--set') {
        setVersionsOfProjects();
    } else if (arg == '-g' || arg == '--graph') {
        runDependencyGraph();
    } else if (arg == '-c' || arg == '--check') {
        runCheckDeps();
    } else if (arg == '-t' || arg == '--test') {
        testAll();
    } else if (arg == '-b' || arg == '--build') {
        buildAll();
    }
});

if (!args.length) {
    showHelp();
}



