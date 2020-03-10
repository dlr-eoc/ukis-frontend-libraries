"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FS = require("fs");
const PATH = require("path");
const depcheck = require("depcheck");
const toposort = require("toposort");
const CWD = process.cwd();
/** https://en.wikipedia.org/wiki/ANSI_escape_code#Colors */
exports.consoleLogColors = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
};
function setVersionsforDependencies(paths, MAINPACKAGE, placeholders, version = MAINPACKAGE.version) {
    const packageAllDeps = Object.assign(MAINPACKAGE.dependencies, MAINPACKAGE.devDependencies);
    paths.map(p => {
        updatePackageJson(p, (json) => {
            /** set main version */
            if (json.version && json.version === placeholders.libVersion) {
                json.version = version;
            }
            const depsList = ['dependencies', 'devDependencies', 'peerDependencies', 'bundledDependencies', 'optionalDependencies'];
            /** set versions for all dependencies */
            depsList.forEach(dep => {
                if (json.hasOwnProperty(dep)) {
                    const deps = json[dep];
                    json[dep] = replaceDependencies(deps, packageAllDeps, placeholders, version);
                }
            });
            return json;
        });
    });
}
exports.setVersionsforDependencies = setVersionsforDependencies;
function replaceDependencies(dependencies, packageAllDeps, placeholders, version) {
    const deps = dependencies;
    Object.keys(deps).forEach(key => {
        const dep = deps[key];
        if (key.includes('@dlr-eoc') && dep === '0.0.0-PLACEHOLDER') {
            deps[key] = version;
        }
        if (key in packageAllDeps && dep === placeholders.vendorVersion) {
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
exports.updatePackageJson = updatePackageJson;
function createNpmrc(path, scope) {
    const npmrc = `
    ${scope}:registry=https://npm.pkg.github.com
    loglevel = "verbose"`;
    try {
        if (path) {
            FS.writeFile(path, npmrc, err => {
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
}
exports.createNpmrc = createNpmrc;
function getProjects(angularJson) {
    const projects = [];
    Object.keys(angularJson.projects).forEach((p) => {
        const project = angularJson.projects[p];
        const customWorkspaceProject = {
            name: p,
            path: PATH.join(CWD, project.root),
            packagePath: PATH.join(CWD, project.root, 'package.json'),
            test: (project.architect && project.architect.test) ? true : false,
            build: (project.architect && project.architect.build) ? true : false,
            server: (project.architect && project.architect.server) ? true : false,
            lint: (project.architect && project.architect.lint) ? true : false,
            serve: (project.architect && project.architect.serve) ? true : false,
            e2e: (project.architect && project.architect.e2e) ? true : false,
            'app-shell': (project.architect && project.architect['app-shell']) ? true : false,
            'extract-i18n': (project.architect && project.architect['extract-i18n']) ? true : false,
            type: project.projectType
        };
        projects.push(customWorkspaceProject);
    });
    return projects;
}
exports.getProjects = getProjects;
/**
 * build dependency graph from projects
 * TODO check dependencies in libs project name!!!!
 */
function dependencyGraph(projects, packageScope, withPeerDeps = false) {
    const nodesmapGraph = new Map();
    const edges = [];
    /**
     * Map of depName: projectName
     */
    const nodes = new Map();
    projects.forEach((project) => {
        if (FS.existsSync(project.packagePath)) { // check not working ???
            const projectPackage = require(project.packagePath);
            const packageProjectName = projectPackage.name.replace(packageScope, '');
            nodes.set(packageProjectName, project.name);
            if (projectPackage.dependencies) {
                const projectDeps = Object.keys(projectPackage.dependencies).filter((key) => key.indexOf(packageScope) !== -1).map(key => key.replace(packageScope, ''));
                if (projectDeps.length > 0) {
                    const depsObj = new Map();
                    projectDeps.forEach((dep) => {
                        if (nodesmapGraph.has(dep)) {
                            depsObj.set(dep, nodesmapGraph.get(dep));
                        }
                        else {
                            depsObj.set(dep, null);
                        }
                        edges.push([dep, packageProjectName]);
                    });
                    nodesmapGraph.set(packageProjectName, depsObj);
                }
            }
            else {
                nodesmapGraph.set(packageProjectName, null);
            }
        }
    });
    return { edges, nodes, nodesmapGraph };
}
exports.dependencyGraph = dependencyGraph;
function getSortedProjects(projects, packageScope) {
    const graph = dependencyGraph(projects, packageScope);
    const edges = graph.edges;
    const nodes = Array.from(graph.nodes.keys());
    /** toposort array nodes:string[], edges: string[][] */
    const flattdeps = toposort.array(nodes, edges);
    const flattdepsAndProjects = flattdeps.map(i => {
        const hasKey = graph.nodes.has(i);
        if (hasKey) {
            return graph.nodes.get(i);
        }
        else {
            return i;
        }
    });
    return flattdepsAndProjects;
}
exports.getSortedProjects = getSortedProjects;
/**
 * check if all imported dependencies are set in package.json of each library
 */
function checkDeps(angularJson, packageScope, showAll = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(`>>> run check dependencies of projects`);
        const projectsPaths = getProjects(angularJson);
        const projectResults = [];
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
        const formatDepcheck = (depcheckResults, projectName, projectPath) => {
            const o = {
                project: projectName,
                projectPath,
                missingDependencies: JSON.stringify(depcheckResults.missing, null, '\t').replace(/\\\\/g, '/'),
                invalidFiles: JSON.stringify(depcheckResults.invalidFiles, null, '\t').replace(/\\\\/g, '/'),
                unusedDependencies: depcheckResults.dependencies,
                unusedDevDependencies: depcheckResults.devDependencies,
                usedDependencies: JSON.stringify(depcheckResults.using, null, '\t').replace(/\\\\/g, '/')
            };
            const missingDeps = Object.keys(depcheckResults.missing).length;
            if (!missingDeps && !showAll) {
                return false;
            }
            else {
                return o;
            }
        };
        // function to check if dep is transitive dependency from using...
        const aysncdepcheck = (item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (FS.existsSync(item.packagePath)) {
                const results = yield depcheck(item.path, options);
                if (results) {
                    const hasMissing = Object.keys(results.missing).length;
                    let filteredResults = results;
                    if (hasMissing) {
                        filteredResults = checkTransitiveDependencies(results, packageScope, options.ignoreMatches);
                    }
                    return formatDepcheck(filteredResults, item.name, item.path);
                }
            }
            else {
                return;
            }
        });
        for (const p of projectsPaths) {
            const res = yield aysncdepcheck(p);
            if (res) {
                projectResults.push(res);
            }
        }
        return projectResults;
    });
}
exports.checkDeps = checkDeps;
function formatCheckDepsOutput(error, showUsed = false) {
    let str = `
  -----------------------------------------------------------
  project:  ${error.project}
  projectPath:  ${error.projectPath}
  missingDependencies: ${error.missingDependencies}`;
    if (error.unusedDependencies.length) {
        str += `
  peerDependencies: ${error.unusedDependencies}`;
    }
    if (error.unusedDevDependencies.length) {
        str += `
  unusedDevDependencies: ${error.unusedDevDependencies}`;
    }
    if (error.invalidFiles.length > 2) {
        str += `
  invalidFiles: ${error.invalidFiles}`;
    }
    if (showUsed) {
        str += `
  usedDependencies: ${error.usedDependencies}`;
    }
    console.log(str);
}
exports.formatCheckDepsOutput = formatCheckDepsOutput;
function formatProjectsDepsOutput(p, i) {
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
}
exports.formatProjectsDepsOutput = formatProjectsDepsOutput;
/**
 * remove Transitive Dependencies from missing in depcheck!
 */
function checkTransitiveDependencies(depcheckResults, packageScope, ignoreMatches) {
    let allDependencies = Object.keys(depcheckResults.using);
    const missingDeps = depcheckResults.missing;
    if (ignoreMatches && ignoreMatches.length > 0) {
        allDependencies = allDependencies.filter(item => !ignoreMatches.includes(item));
    }
    /**
     * get package.json for each dependency and check if it includes one of the dependencies;
     */
    allDependencies.map(key => {
        let packagePath = `${key}/package.json`;
        if (key.includes(packageScope)) {
            packagePath = PATH.join(CWD, packagePath.replace(packageScope, 'projects/'));
        }
        const depPackage = require(packagePath); // require(`${key}/package.json`); //
        const allPackageDeps = [];
        if (depPackage.dependencies) {
            Object.keys(depPackage.dependencies).map(i => allPackageDeps.push(i));
        }
        if (depPackage.devDependencies) {
            Object.keys(depPackage.devDependencies).map(i => allPackageDeps.push(i));
        }
        if (depPackage.peerDependencies) {
            Object.keys(depPackage.peerDependencies).map(i => allPackageDeps.push(i));
        }
        if (depPackage.optionalDependencies) {
            Object.keys(depPackage.optionalDependencies).map(i => allPackageDeps.push(i));
        }
        /**
         * create a Intersection of depcheck.using and the required package and remove it from missing
         */
        const transitiveDeps = allPackageDeps.filter(x => allDependencies.includes(x));
        transitiveDeps.map(d => {
            if (missingDeps.hasOwnProperty(d)) {
                delete depcheckResults.missing[d];
            }
        });
    });
    return depcheckResults;
}
