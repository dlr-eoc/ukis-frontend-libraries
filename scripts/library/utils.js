"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var FS = require("fs");
var PATH = require("path");
var depcheck = require("depcheck");
var toposort = require("toposort");
var CWD = process.cwd();
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
function setVersionsforDependencies(paths, MAINPACKAGE, placeholders, version) {
    if (version === void 0) { version = MAINPACKAGE.version; }
    var packageAllDeps = Object.assign(MAINPACKAGE.dependencies, MAINPACKAGE.devDependencies);
    paths.map(function (p) {
        updatePackageJson(p, function (json) {
            /** set main version */
            if (json.version && json.version === placeholders.libVersion) {
                json.version = version;
            }
            var depsList = ['dependencies', 'devDependencies', 'peerDependencies', 'bundledDependencies', 'optionalDependencies'];
            /** set versions for all dependencies */
            depsList.forEach(function (dep) {
                if (json.hasOwnProperty(dep)) {
                    var deps = json[dep];
                    json[dep] = replaceDependencies(deps, packageAllDeps, placeholders, version);
                }
            });
            return json;
        });
    });
}
exports.setVersionsforDependencies = setVersionsforDependencies;
function replaceDependencies(dependencies, packageAllDeps, placeholders, version) {
    var deps = dependencies;
    Object.keys(deps).forEach(function (key) {
        var dep = deps[key];
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
    FS.readFile(path, 'utf8', function (error, jsonString) {
        if (error) {
            console.log("Error read file " + path + ":", error);
            return;
        }
        try {
            if (jsonString) {
                var jsonObj = JSON.parse(jsonString);
                var content = cb(jsonObj);
                FS.writeFile(path, JSON.stringify(content), function (err) {
                    if (err) {
                        console.log('Error writing file', err);
                    }
                    else {
                        console.log("Update file " + path);
                    }
                });
            }
        }
        catch (err) {
            console.log("Error parsing JSON ", err);
        }
    });
}
function getProjects(angularJson) {
    var projects = [];
    Object.keys(angularJson.projects).forEach(function (p) {
        var project = angularJson.projects[p];
        var customWorkspaceProject = {
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
function dependencyGraph(projects, packageScope, withPeerDeps) {
    if (withPeerDeps === void 0) { withPeerDeps = false; }
    var nodesmapGraph = new Map();
    var edges = [];
    /**
     * Map of depName: projectName
     */
    var nodes = new Map();
    projects.forEach(function (project) {
        if (FS.existsSync(project.packagePath)) { // check not working ???
            var projectPackage = require(project.packagePath);
            var packageProjectName_1 = projectPackage.name.replace(packageScope, '');
            nodes.set(packageProjectName_1, project.name);
            if (projectPackage.dependencies) {
                var projectDeps = Object.keys(projectPackage.dependencies).filter(function (key) { return key.indexOf(packageScope) !== -1; }).map(function (key) { return key.replace(packageScope, ''); });
                if (projectDeps.length > 0) {
                    var depsObj_1 = new Map();
                    projectDeps.forEach(function (dep) {
                        if (nodesmapGraph.has(dep)) {
                            depsObj_1.set(dep, nodesmapGraph.get(dep));
                        }
                        else {
                            depsObj_1.set(dep, null);
                        }
                        edges.push([dep, packageProjectName_1]);
                    });
                    nodesmapGraph.set(packageProjectName_1, depsObj_1);
                }
            }
            else {
                nodesmapGraph.set(packageProjectName_1, null);
            }
        }
    });
    return { edges: edges, nodes: nodes, nodesmapGraph: nodesmapGraph };
}
exports.dependencyGraph = dependencyGraph;
function getSortedProjects(projects, packageScope) {
    var graph = dependencyGraph(projects, packageScope);
    var edges = graph.edges;
    var nodes = Array.from(graph.nodes.keys());
    /** toposort array nodes:string[], edges: string[][] */
    var flattdeps = toposort.array(nodes, edges);
    var flattdepsAndProjects = flattdeps.map(function (i) {
        var hasKey = graph.nodes.has(i);
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
function checkDeps(angularJson, packageScope, showAll) {
    if (showAll === void 0) { showAll = false; }
    return __awaiter(this, void 0, void 0, function () {
        var projectsPaths, projectResults, options, formatDepcheck, aysncdepcheck, _i, projectsPaths_1, p, res;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(">>> run check dependencies of projects");
                    projectsPaths = getProjects(angularJson);
                    projectResults = [];
                    options = {
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
                    formatDepcheck = function (depcheckResults, projectName, projectPath) {
                        var o = {
                            project: projectName,
                            projectPath: projectPath,
                            missingDependencies: JSON.stringify(depcheckResults.missing, null, '\t').replace(/\\\\/g, '/'),
                            invalidFiles: JSON.stringify(depcheckResults.invalidFiles, null, '\t').replace(/\\\\/g, '/'),
                            unusedDependencies: depcheckResults.dependencies,
                            unusedDevDependencies: depcheckResults.devDependencies,
                            usedDependencies: JSON.stringify(depcheckResults.using, null, '\t').replace(/\\\\/g, '/')
                        };
                        var missingDeps = Object.keys(depcheckResults.missing).length;
                        if (!missingDeps && !showAll) {
                            return false;
                        }
                        else {
                            return o;
                        }
                    };
                    aysncdepcheck = function (item) { return __awaiter(_this, void 0, void 0, function () {
                        var results, hasMissing, filteredResults;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!FS.existsSync(item.packagePath)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, depcheck(item.path, options)];
                                case 1:
                                    results = _a.sent();
                                    if (results) {
                                        hasMissing = Object.keys(results.missing).length;
                                        filteredResults = results;
                                        if (hasMissing) {
                                            filteredResults = checkTransitiveDependencies(results, packageScope, options.ignoreMatches);
                                        }
                                        return [2 /*return*/, formatDepcheck(filteredResults, item.name, item.path)];
                                    }
                                    return [3 /*break*/, 3];
                                case 2: return [2 /*return*/];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); };
                    _i = 0, projectsPaths_1 = projectsPaths;
                    _a.label = 1;
                case 1:
                    if (!(_i < projectsPaths_1.length)) return [3 /*break*/, 4];
                    p = projectsPaths_1[_i];
                    return [4 /*yield*/, aysncdepcheck(p)];
                case 2:
                    res = _a.sent();
                    if (res) {
                        projectResults.push(res);
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, projectResults];
            }
        });
    });
}
exports.checkDeps = checkDeps;
function formatCheckDepsOutput(error, showUsed) {
    if (showUsed === void 0) { showUsed = false; }
    var str = "\n  -----------------------------------------------------------\n  project:  " + error.project + "\n  projectPath:  " + error.projectPath + "\n  missingDependencies: " + error.missingDependencies;
    if (error.unusedDependencies.length) {
        str += "\n  peerDependencies: " + error.unusedDependencies;
    }
    if (error.unusedDevDependencies.length) {
        str += "\n  unusedDevDependencies: " + error.unusedDevDependencies;
    }
    if (error.invalidFiles.length > 2) {
        str += "\n  invalidFiles: " + error.invalidFiles;
    }
    if (showUsed) {
        str += "\n  usedDependencies: " + error.usedDependencies;
    }
    console.log(str);
}
exports.formatCheckDepsOutput = formatCheckDepsOutput;
function formatProjectsDepsOutput(p, i) {
    var str = "\n-----------------------------------------------------------\n|name:  " + p.name + "    -  count: " + i + "\n|----------------------------------------------------------\n|version:  " + p.version + "\n|\n|dependencies:" + ((p.dependencies) ? p.dependencies.split(',').map(function (d) { return "\n|   - " + d; }) : '') + "\n|\n|peerDependencies:" + ((p.peerDependencies) ? p.peerDependencies.split(',').map(function (d) { return "\n|   - " + d; }) : '');
    console.log(str);
}
exports.formatProjectsDepsOutput = formatProjectsDepsOutput;
/**
 * remove Transitive Dependencies from missing in depcheck!
 */
function checkTransitiveDependencies(depcheckResults, packageScope, ignoreMatches) {
    var allDependencies = Object.keys(depcheckResults.using);
    var missingDeps = depcheckResults.missing;
    if (ignoreMatches && ignoreMatches.length > 0) {
        allDependencies = allDependencies.filter(function (item) { return !ignoreMatches.includes(item); });
    }
    /**
     * get package.json for each dependency and check if it includes one of the dependencies;
     */
    allDependencies.map(function (key) {
        var packagePath = key + "/package.json";
        if (key.includes(packageScope)) {
            packagePath = PATH.join(CWD, packagePath.replace(packageScope, 'projects/'));
        }
        var depPackage = require(packagePath); // require(`${key}/package.json`); //
        var allPackageDeps = [];
        if (depPackage.dependencies) {
            Object.keys(depPackage.dependencies).map(function (i) { return allPackageDeps.push(i); });
        }
        if (depPackage.devDependencies) {
            Object.keys(depPackage.devDependencies).map(function (i) { return allPackageDeps.push(i); });
        }
        if (depPackage.peerDependencies) {
            Object.keys(depPackage.peerDependencies).map(function (i) { return allPackageDeps.push(i); });
        }
        if (depPackage.optionalDependencies) {
            Object.keys(depPackage.optionalDependencies).map(function (i) { return allPackageDeps.push(i); });
        }
        /**
         * create a Intersection of depcheck.using and the required package and remove it from missing
         */
        var transitiveDeps = allPackageDeps.filter(function (x) { return allDependencies.includes(x); });
        transitiveDeps.map(function (d) {
            if (missingDeps.hasOwnProperty(d)) {
                delete depcheckResults.missing[d];
            }
        });
    });
    return depcheckResults;
}
