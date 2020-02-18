"use strict";
/**
 * Get and set Version of Library projects from frontend-libraries
 *
 * node scripts/projectsVersion.js -l
 */
Object.defineProperty(exports, "__esModule", { value: true });
const NG = require("@angular/cli");
const PATH = require("path");
const FS = require("fs");
const toposort = require("toposort");
const depcheck = require("depcheck");
const UKIS_SCOPE = '@dlr-eoc/';
const CWD = process.cwd();
const MAINPACKAGE = require(PATH.join(CWD, 'package.json'));
const ANGULARJSON = require(PATH.join(CWD, 'angular.json'));
const LIBRARIES_VERSION = MAINPACKAGE.version;
const LIBRARIES_PLACEHOLDER = '0.0.0-PLACEHOLDER';
const VENDOR_PLACEHOLDER = '0.0.0-PLACEHOLDER-VENDOR';
function setVersionsforDependencies(paths) {
    const packageAllDeps = Object.assign(MAINPACKAGE.dependencies, MAINPACKAGE.devDependencies);
    paths.map(p => {
        updatePackageJson(p, (json) => {
            /** set main version */
            if (json.version && json.version === LIBRARIES_PLACEHOLDER) {
                json.version = LIBRARIES_VERSION;
            }
            const depsList = ['dependencies', 'devDependencies', 'peerDependencies', 'bundledDependencies', 'optionalDependencies'];
            /** set versions for all dependencies */
            depsList.forEach(dep => {
                if (json.hasOwnProperty(dep)) {
                    const deps = json[dep];
                    json[dep] = replaceDependencies(deps, packageAllDeps, LIBRARIES_VERSION);
                }
            });
            return json;
        });
    });
}
exports.setVersionsforDependencies = setVersionsforDependencies;
function replaceDependencies(dependencies, packageAllDeps, ukisVersion) {
    const deps = dependencies;
    Object.keys(deps).forEach(key => {
        const dep = deps[key];
        if (key.includes('@dlr-eoc') && dep === '0.0.0-PLACEHOLDER') {
            deps[key] = ukisVersion;
        }
        if (key in packageAllDeps && dep === VENDOR_PLACEHOLDER) {
            deps[key] = packageAllDeps[key];
        }
    });
    return deps;
}
function updatePackageJson(path, cb) {
    FS.readFile(path, 'utf8', (error, jsonString) => {
        if (error) {
            console.log(`Error read file ${path}:`, error);
            return;
        }
        try {
            if (jsonString) {
                const jsonObj = JSON.parse(jsonString);
                const content = cb(jsonObj);
                FS.writeFile(path, JSON.stringify(content), err => {
                    if (err) {
                        console.log('Error writing file', err);
                    }
                    else {
                        console.log(`Update file ${path}`);
                    }
                });
            }
        }
        catch (err) {
            console.log(`Error parsing JSON `, err);
        }
    });
}
function getProjects() {
    const projects = [];
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
    const projects = getProjects(), nodesmap = new Map(), edges = [], nodes = [];
    projects.forEach((project) => {
        const projectPackage = require(project.package);
        const projectName = projectPackage.name.replace(UKIS_SCOPE, '');
        nodes.push(projectName);
        if (projectPackage.dependencies) {
            const projectDeps = Object.keys(projectPackage.dependencies).filter((key) => key.indexOf(UKIS_SCOPE) !== -1).map(key => key.replace(UKIS_SCOPE, ''));
            if (projectDeps.length > 0) {
                const _obj = new Map();
                projectDeps.forEach((_dep) => {
                    if (nodesmap.has(_dep)) {
                        _obj.set(_dep, nodesmap.get(_dep));
                    }
                    else {
                        _obj.set(_dep, null);
                    }
                    edges.push([_dep, projectName]);
                });
                nodesmap.set(projectName, _obj);
            }
        }
        else {
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
    const projectsPaths = getProjects(), promises = [];
    const options = {
        ignoreBinPackage: false,
        skipMissing: false,
        ignoreDirs: [
            'dist'
        ],
        ignoreMatches: [
            'geojson' // @types/geojson imports geojson
        ],
        parsers: {
            '*.ts': depcheck.parser.typescript
        },
        detectors: [
            depcheck.detector.requireCallExpression,
            depcheck.detector.importDeclaration,
            depcheck.detector.typescriptImportType,
            depcheck.detector.typescriptImportEqualsDeclaration
        ],
        specials: [ // the target special parsers
        ],
        json: true
    };
    const formatUnused = (unused, projectName, projectPath) => {
        const o = {
            project: projectName,
            projectPath: projectPath,
            missingDependencies: JSON.stringify(unused.missing).replace(/\\\\/g, '/'),
            // invalidFiles: unused.invalidFiles, @babel errors not same as typescript
            unusedDependencies: unused.dependencies,
            unusedDevDependencies: unused.devDependencies
        };
        const missingDeps = Object.keys(unused.missing).length, unusedDeps = unused.dependencies.length, unusedDevDeps = unused.devDependencies.length;
        // if (!missingDeps && !unusedDeps && !unusedDevDeps) unused not working correctly
        if (!missingDeps) {
            return false;
        }
        else {
            return o;
        }
    };
    const aysncdepcheck = (item) => {
        return new Promise((resolve, reject) => {
            depcheck(item.path, options, (unused) => {
                const missing = formatUnused(unused, item.name, item.path);
                if (!missing) {
                    resolve(missing);
                }
                else {
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
        }
        else {
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
            }
            else {
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
            }
            else {
                runBuilds(offset, projects);
            }
        });
    }
}
function buildAll() {
    checkDeps().then((result) => {
        /** build ony if there are no missing deps */
        if (result) {
            console.log(result);
            throw new Error(`check for missing dependencies`);
        }
        else {
            const deps = dependencyGraph();
            const flattdeps = toposort.array(deps.nodes, deps.edges);
            runBuilds(0, flattdeps);
        }
    });
}
function setVersionsOfProjects(useDistPath = false) {
    let projectsPaths = getProjects().map(item => item.package);
    if (useDistPath) {
        projectsPaths = projectsPaths.map(p => p.replace('projects', 'dist'));
    }
    projectsPaths = projectsPaths.filter(p => FS.existsSync(p));
    const errors = projectsAndDependencies(true);
    if (!errors.length) {
        setVersionsforDependencies(projectsPaths);
        console.log(`replaced all versions in projects with '${LIBRARIES_PLACEHOLDER}' and '${VENDOR_PLACEHOLDER}' with the versions of the main package.json`);
    }
    else {
        console.log(`check main package.json version and projects for errors!`);
        console.table(errors);
    }
}
function listAllProjects() {
    const projectsPaths = getProjects();
    const list = projectsPaths.reduce((p, n) => {
        const relPath = n.path.split(PATH.join(CWD, '/'))[1].replace(/\\/g, '/');
        return p + '- ' + `[${n.name}](${relPath}/README.md)` + '\n';
    }, '');
    console.log(list);
}
function projectsAndDependencies(silent = false, showPeer = false) {
    const projects = [], projectsPeer = [], errors = [], projectsPaths = getProjects();
    projectsPaths.forEach((project) => {
        const projectPackage = require(project.package);
        const _project = {
            name: projectPackage.name,
            version: projectPackage.version.replace('0.0.0', LIBRARIES_VERSION),
            error: false,
            dependencies: null
        };
        if (projectPackage.version !== LIBRARIES_PLACEHOLDER) {
            const error = `version of project: ${projectPackage.name} must be ${LIBRARIES_PLACEHOLDER} for build!`;
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
                if (key.indexOf(UKIS_SCOPE) !== -1 && dep !== LIBRARIES_PLACEHOLDER) {
                    const error = `version of dependency: ${key} in project: ${projectPackage.name}
                    must be ${LIBRARIES_PLACEHOLDER} for build!`;
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
|dependencies:${(p.dependencies) ? p.dependencies.split(',').map(d => `\n|   - ${d}`) : ''}
|
|peerDependencies:${(p.peerDependencies) ? p.peerDependencies.split(',').map(d => `\n|   - ${d}`) : ''}`;
                console.log(str);
            });
        }
        else {
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
-s, --set               Set versions of all projects in projects folder
--setInDist         Set versions of all projects in dist folder
-g, --graph             Show a dependency graph
-c, --check             Check if all dependencies are listed in the package.json of the project
-t, --test              Run ng test for all projects
-b, --build             Run ng build fal all projects with toposort dependencies`);
}
function run() {
    const args = process.argv.slice(2);
    args.forEach((arg) => {
        if (arg === '-h' || arg === '--help') {
            showHelp();
        }
        else if (arg === '-l' || arg === '--list') {
            listAllProjects();
        }
        else if (arg === '-d' || arg === '--deps') {
            projectsAndDependencies();
        }
        else if (arg === '--depsPeer') {
            projectsAndDependencies(false, true);
        }
        else if (arg === '-s' || arg === '--set') {
            setVersionsOfProjects();
        }
        else if (arg === '--setInDist') {
            setVersionsOfProjects(true);
        }
        else if (arg === '-g' || arg === '--graph') {
            runDependencyGraph();
        }
        else if (arg === '-c' || arg === '--check') {
            runCheckDeps();
        }
        else if (arg === '-t' || arg === '--test') {
            testAll();
        }
        else if (arg === '-b' || arg === '--build') {
            buildAll();
        }
    });
    if (!args.length) {
        showHelp();
    }
}
exports.run = run;
run();
