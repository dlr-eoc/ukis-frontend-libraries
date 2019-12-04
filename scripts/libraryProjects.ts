/**
* Get and set Version of Library projects from frontend-libraries
*
* node scripts/projectsVersion.js -l
*/

// const NG = require('@angular/cli');
import * as NG from '@angular/cli';
import * as PATH from 'path';
import * as replace from 'replace';
import * as toposort from 'toposort';
import * as depcheck from 'depcheck';
// const toposort = require('toposort');
// const depcheck = require('depcheck');

export function run() {
    const UKIS_SCOPE = '@ukis/';

    const CWD = process.cwd();
    const UKIS_VERSION_PLACEHOLDER = '0.0.0-PLACEHOLDER';
    const NG_VERSION_PLACEHOLDER = '0.0.0-NG-PLACEHOLDER'; // TODO replace version of angular get from package.json -> @angular/core
    const MAINPACKAGE = require(PATH.join(CWD, 'package.json'));
    const ANGULARJSON = require(PATH.join(CWD, 'angular.json'));

    interface Iprojects {
        name: string;
        path: string;
        package: string;
        testable: boolean;
        buildable: boolean;
        type: string;
    }

    interface Idep {
        key: string;
        value: string[];
        project: string;
    }

    function getProjects() {
        const projects: Iprojects[] = [];

        Object.keys(ANGULARJSON.projects).forEach((project) => {
            const __project = ANGULARJSON.projects[project];
            const _project = {
                name: project,
                path: PATH.join(CWD, __project.root),
                package: PATH.join(CWD, __project.root, 'package.json'),
                testable: (__project.architect && __project.architect.test) ? true : false,
                buildable: (__project.architect && __project.architect.build) ? true : false,
                type: __project.projectType
            };
            projects.push(_project);
        });
        return projects.filter(item => item.type === 'library');
    }

    function dependencyGraph() {
        const projects = getProjects(), nodesmap: Map<string, any> = new Map(), edges: [string, string][] = [], nodes: string[] = [];
        projects.forEach((project) => {
            const projectPackage = require(project.package);
            const projectName = projectPackage.name.replace(UKIS_SCOPE, '');
            nodes.push(projectName);
            if (projectPackage.dependencies) {
                const projectDeps = Object.keys(projectPackage.dependencies).filter((key) => key.indexOf(UKIS_SCOPE) !== -1).map(key => key.replace(UKIS_SCOPE, ''));
                if (projectDeps.length > 0) {
                    const _obj: Map<string, any> = new Map();
                    projectDeps.forEach((_dep) => {
                        if (nodesmap.has(_dep)) {
                            _obj.set(_dep, nodesmap.get(_dep));
                        } else {
                            _obj.set(_dep, null);
                        }
                        edges.push([_dep, projectName]);
                    });
                    nodesmap.set(projectName, _obj);
                }
            } else {
                nodesmap.set(projectName, null);
            }
        });
        return { edges, nodes, nodesmap };
    }

    function runDependencyGraph() {
        console.log(dependencyGraph().nodesmap);
    }

    function checkDeps() {
        console.log(`>>> run check dependencies for projects`);
        const projectsPaths = getProjects(), promises: Promise<{}>[] = [];

        const options = {
            ignoreBinPackage: false, // ignore the packages with bin entry
            skipMissing: false, // skip calculation of missing dependencies
            ignoreDirs: [ // folder with these names will be ignored
                'dist'
            ],
            ignoreMatches: [ // ignore dependencies that matches these globs
            ],
            parsers: { // the target parsers
                // '*.js': depcheck.parser.es6,
                // '*.jsx': depcheck.parser.jsx
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

        const filterFiles = (dep, project) => {
            let keys = Object.keys(dep),
                _dep: Idep;

            if (keys.length) {
                for (const key of keys) {
                    const depsarray = dep[key].filter(item => item.indexOf('test.ts') === -1 && item.indexOf('.spec.ts') === -1);
                    if (depsarray.length) {
                        _dep = {
                            project: project,
                            key: key,
                            value: depsarray
                        };
                        return _dep;
                    } else {
                        return false;
                    }
                }
            }
        };

        const aysncdepcheck = (item: Iprojects) => {
            return new Promise((resolve, reject) => {
                depcheck(item.path, options, (unused) => {
                    const missing = filterFiles(unused.missing, item.name);
                    if (!missing) {
                        resolve(missing);
                    } else {
                        resolve(missing);
                    }
                    // console.log('unused.dependencies', unused.dependencies); // an array containing the unused dependencies
                    // console.log('unused.devDependencies', unused.devDependencies); // an array containing the unused devDependencies
                    // console.log('unused.missing', unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
                    // console.log('unused.using', unused.using); // a lookup indicating each dependency is used by which files
                    // console.log('unused.invalidFiles', unused.invalidFiles); // files that cannot access or parse
                    // console.log('unused.invalidDirs', unused.invalidDirs); // directories that cannot access
                });
            });
        };

        projectsPaths.forEach((item) => {
            promises.push(aysncdepcheck(item));
        });

        return Promise.all(promises).then(result => {
            const _result = result.filter(item => item);
            if (_result.length) {
                return _result;
            } else {
                console.log('no missing dependencies detected :)');
                return false;
            }
        });
    }

    function runCheckDeps() {
        checkDeps().then((result) => {
            if (result) {
                console.log(result);
            }
        });
    }

    function runTests(offset = 0, projects) {
        const project = projects[offset];
        const options = {
            cliArgs: ['test', '--watch=false', project]
        };

        if (project) {
            console.info(`>>> run ng ${options.cliArgs.join(' ')}`);
            NG.default(options).then((result) => {
                offset++;
                if (offset >= projects.length) {
                    process.exit(0);
                } else {
                    runTests(offset, projects);
                }
            });
        }
    }

    function testAll() {
        const flattdeps = getProjects().filter(item => item.testable).map(item => item.name);
        runTests(0, flattdeps);
    }

    function runBuilds(offset = 0, projects) {
        const project = projects[offset];

        const options = {
            cliArgs: ['build', '--watch=false', project]
        };

        if (project) {
            console.info(`>>> run ng ${options.cliArgs.join(' ')}`);
            // TODO: check if all deps build before
            NG.default(options).then((result) => {
                offset++;
                if (offset >= projects.length) {
                    process.exit(0);
                } else {
                    runBuilds(offset, projects);
                }
            });
        }
    }


    function buildAll() {
        checkDeps().then((result) => {
            /** build ony if there are no missing deps */
            if (result) {
                throw new Error(`check for missing dependencies ${result}`);
            } else {
                const deps = dependencyGraph();
                const flattdeps = toposort.array(deps.nodes, deps.edges);
                runBuilds(0, flattdeps);
            }
        });
    }

    function setVersionsOfProjects() {
        const projectsPaths = getProjects().map(item => item.package);
        const errors = projectsAndDependencies(true);
        if (errors.length < 1 && MAINPACKAGE.version) {
            // console.log(projectsPaths)
            replace({
                regex: UKIS_VERSION_PLACEHOLDER,
                replacement: MAINPACKAGE.version,
                paths: projectsPaths,
                recursive: true,
                silent: true,
                include: 'package.json'
            });
            console.log(`replaced all ${UKIS_VERSION_PLACEHOLDER} with ${MAINPACKAGE.version}`);
        } else {
            console.log(`check main package.json version and projects for errors!`);
            console.table(errors);
        }
    }

    function listAllProjects() {
        const projectsPaths = getProjects();
        const list = projectsPaths.reduce((p, n) => {
            return p + '- ' + n.name + '\n';
        }, '');
        console.log(list);
    }

    function projectsAndDependencies(silent = false) {
        const projects: { name: string, version: string, error: boolean, dependencies: string }[] = [],
            errors: { project: string, error: string }[] = [],
            projectsPaths = getProjects();

        projectsPaths.forEach((project) => {
            const projectPackage = require(project.package);
            const _project = {
                name: projectPackage.name,
                version: projectPackage.version,
                error: false,
                dependencies: null
            };

            if (projectPackage.version !== UKIS_VERSION_PLACEHOLDER) {
                const error = `version of project: ${projectPackage.name} must be ${UKIS_VERSION_PLACEHOLDER} for build!`;
                if (!silent) {
                    console.error(error);
                }
                _project.error = true;
                errors.push({ project: projectPackage.name, error: error });
            }

            if (projectPackage.name.indexOf(UKIS_SCOPE) === -1) {
                const error = `name of project: ${projectPackage.name} must be prefixed with the ${UKIS_SCOPE} namespace!`;
                if (!silent) {
                    console.error(error);
                }
                _project.error = true;
                errors.push({ project: projectPackage.name, error: error });
            }

            if (projectPackage.dependencies) {
                _project.dependencies = Object.keys(projectPackage.dependencies).join(',') || null;

                Object.keys(projectPackage.dependencies).forEach((key) => {
                    const dep = projectPackage.dependencies[key];
                    if (key.indexOf(UKIS_SCOPE) !== -1 && dep !== UKIS_VERSION_PLACEHOLDER) {
                        const error = `version of dependency: ${key} in project: ${projectPackage.name} must be ${UKIS_VERSION_PLACEHOLDER} for build!`;
                        if (!silent) {
                            errors.push({ project: projectPackage.name, error: error });
                        }
                        _project.error = true;
                        errors.push({ project: projectPackage.name, error: error });
                    }
                });
            }
            projects.push(_project);
        });
        if (!silent) {
            console.table(projects);
        }

        return errors;
    }

    function showHelp() {
        console.log(`
Syntax:   node  [options]

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


    const args = process.argv.slice(2);
    args.forEach((arg) => {
        if (arg === '-h' || arg === '--help') {
            showHelp();
        } else if (arg === '-l' || arg === '--list') {
            listAllProjects();
        } else if (arg === '-d' || arg === '--deps') {
            projectsAndDependencies();
        } else if (arg === '-s' || arg === '--set') {
            setVersionsOfProjects();
        } else if (arg === '-g' || arg === '--graph') {
            runDependencyGraph();
        } else if (arg === '-c' || arg === '--check') {
            runCheckDeps();
        } else if (arg === '-t' || arg === '--test') {
            testAll();
        } else if (arg === '-b' || arg === '--build') {
            buildAll();
        }
    });

    if (!args.length) {
        showHelp();
    }
};
run();



