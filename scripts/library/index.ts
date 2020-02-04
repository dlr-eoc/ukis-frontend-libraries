/**
* Get and set Version of Library projects from frontend-libraries
*
* node scripts/projectsVersion.js -l
*/

import * as NG from '@angular/cli';
import * as PATH from 'path';
import * as replace from 'replace';
import * as toposort from 'toposort';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import * as depcheck from 'depcheck';
import { IPackageJSON } from './npm-package.interface';

export function run() {
    const UKIS_SCOPE = '@ukis/';
    const version_placeholders = {
        ukis: '0.0.0-PLACEHOLDER', // ukis-frontend-libraries
        ng: '0.0.0-NG-PLACEHOLDER', // @angular/core
        ngcdk: '0.0.0-ngcdk-PLACEHOLDER',
        ngdev: '0.0.0-ngdev-PLACEHOLDER',
        md5: '0.0.0-md5-PLACEHOLDER',
        clr: '0.0.0-CLR-PLACEHOLDER', // @clr
        corejs: '0.0.0-corejs-PLACEHOLDER',
        zonejs: '0.0.0-zonejs-PLACEHOLDER',
        rxjs: '0.0.0-rxjs-PLACEHOLDER'
    };

    const CWD = process.cwd();
    const MAINPACKAGE: IPackageJSON = require(PATH.join(CWD, 'package.json'));
    const ANGULARJSON: WorkspaceSchema = require(PATH.join(CWD, 'angular.json'));

    const version_replace = {
        ukis: MAINPACKAGE.version,
        ng: MAINPACKAGE.dependencies['@angular/core'],
        ngcdk: MAINPACKAGE.dependencies['@angular/cdk'],
        ngdev: MAINPACKAGE.dependencies['@angular-devkit/core'],
        md5: MAINPACKAGE.dependencies['md5'],
        clr: MAINPACKAGE.dependencies['@clr/angular'],
        corejs: MAINPACKAGE.dependencies['core-js'],
        zonejs: MAINPACKAGE.dependencies['zone.js'],
        rxjs: MAINPACKAGE.dependencies['rxjs'],
    };

    interface Iprojects {
        name: string;
        path: string;
        package: string;
        testable: boolean;
        buildable: boolean;
        type: string;
    }

    interface Iproject {
        name: string;
        version: string;
        error: boolean;
        dependencies: string;
        peerDependencies?: string;
    }

    interface Idep {
        errors: { error: string, errorPaths: string[] }[];
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

    function dependencyGraph(withPeerDeps = false) {
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
                'geojson' // @types/geojson imports geojson
            ],
            parsers: { // the target parsers
                '*.ts': depcheck.parser.typescript
            },
            detectors: [ // the target detectors
                depcheck.detector.requireCallExpression,
                depcheck.detector.importDeclaration,
                depcheck.detector.typescriptImportType,
                depcheck.detector.typescriptImportEqualsDeclaration
            ],
            specials: [ // the target special parsers

            ],
            json: true
        };

        const formatUnused = (unused: depcheck.Results, projectName: string, projectPath: string) => {
            const o = {
                project: projectName,
                projectPath: projectPath,
                missingDependencies: JSON.stringify(unused.missing).replace(/\\\\/g, '/'),
                // invalidFiles: unused.invalidFiles, @babel errors not same as typescript
                unusedDependencies: unused.dependencies,
                unusedDevDependencies: unused.devDependencies
            };
            const missingDeps = Object.keys(unused.missing).length,
                unusedDeps = unused.dependencies.length,
                unusedDevDeps = unused.devDependencies.length;
            // if (!missingDeps && !unusedDeps && !unusedDevDeps) unused not working correctly
            if (!missingDeps) {
                return false;
            } else {
                return o;
            }
        };

        const aysncdepcheck = (item: Iprojects) => {
            return new Promise((resolve, reject) => {
                depcheck(item.path, options, (unused) => {
                    const missing = formatUnused(unused, item.name, item.path);
                    if (!missing) {
                        resolve(missing);
                    } else {
                        resolve(missing);
                    }
                    // console.log(item.path, '------------------------')
                    // console.log('unused.dependencies', unused); // an array containing the unused dependencies
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
                console.log(result)
                throw new Error(`check for missing dependencies`);
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
        if (!errors.length) {
            Object.keys(version_placeholders).map(key => {
                const placeholder = version_placeholders[key];
                const replacement = version_replace[key];
                replace({
                    regex: placeholder,
                    replacement: replacement,
                    paths: projectsPaths,
                    recursive: true,
                    silent: true,
                    include: 'package.json'
                });
                console.log(`replaced all ${placeholder} with ${replacement}`);
            });
            console.log(`replaced all ${version_placeholders.ukis} with ${version_replace.ukis}`);
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

    function projectsAndDependencies(silent = false, showPeer = false) {
        const projects: Iproject[] = [],
            projectsPeer: Iproject[] = [],
            errors: { project: string, error: string }[] = [],
            projectsPaths = getProjects();

        projectsPaths.forEach((project) => {
            const projectPackage = require(project.package);
            const _project: Iproject = {
                name: projectPackage.name,
                version: projectPackage.version.replace('0.0.0', version_replace.ukis),
                error: false,
                dependencies: null
            };

            if (projectPackage.version !== version_placeholders.ukis) {
                const error = `version of project: ${projectPackage.name} must be ${version_placeholders.ukis} for build!`;
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
                const dependencies = Object.keys(projectPackage.dependencies);
                _project.dependencies = dependencies.join(',') || null;

                Object.keys(projectPackage.dependencies).forEach((key) => {
                    const dep = projectPackage.dependencies[key];
                    if (key.indexOf(UKIS_SCOPE) !== -1 && dep !== version_placeholders.ukis) {
                        const error = `version of dependency: ${key} in project: ${projectPackage.name} 
                        must be ${version_placeholders.ukis} for build!`;
                        if (!silent) {
                            errors.push({ project: projectPackage.name, error: error });
                        }
                        _project.error = true;
                        errors.push({ project: projectPackage.name, error: error });
                    }
                });
            }
            // without peerDeps
            projects.push(_project);
            // --------------------------------------
            const __project = Object.assign({}, _project);
            if (projectPackage.peerDependencies) {
                const peerDependencies = Object.keys(projectPackage.peerDependencies);
                __project.peerDependencies = peerDependencies.join(',') || null;
            }
            projectsPeer.push(__project);


        });
        if (!silent) {
            if (showPeer) {
                projectsPeer.map((p, i) => {
                    const str = `
    -----------------------------------------------------------
    |name:  ${p.name}    -  count: ${i}
    |----------------------------------------------------------
    |version:  ${p.version}
    |
    |dependencies:${(p.dependencies) ? p.dependencies.split(',').map(d => `\n    |   - ${d}`) : ''}
    |
    |peerDependencies:${(p.peerDependencies) ? p.peerDependencies.split(',').map(d => `\n    |   - ${d}`) : ''}`;
                    console.log(str)
                });
            } else {
                console.table(projects);
            }
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
    --depsPeer          List all projects with dependencies and peerDependencies
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
        } else if (arg === '--depsPeer') {
            projectsAndDependencies(false, true);
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
}
run();



