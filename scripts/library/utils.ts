import { IPackageJSON, IDependencyMap } from './npm-package.interface';
import * as FS from 'fs';
import { WorkspaceSchema, WorkspaceTargets } from '@schematics/angular/utility/workspace-models';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import * as PATH from 'path';

import * as depcheck from 'depcheck';
import * as toposort from 'toposort';

const CWD = process.cwd();

/** https://en.wikipedia.org/wiki/ANSI_escape_code#Colors */
export const consoleLogColors = {
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

export interface Iplaceholders {
  libVersion: string;
  vendorVersion: string;
}

/* export interface ICustomWorkspaceProject {
  name: string;
  path: string;
  packagePath: string;
  testable: boolean;
  buildable: boolean;
  type: WorkspaceProject['projectType'];
} */

/* type TprojectTargets = {
  [K in keyof WorkspaceTargets]: string | boolean
}; */


interface IprojectTargets {
  build: boolean;
  server: boolean;
  lint: boolean;
  test: boolean;
  serve: boolean;
  e2e: boolean;
  'app-shell': boolean;
  'extract-i18n': boolean;
};


export interface ICustomWorkspaceProject extends IprojectTargets {
  name: string;
  path: string;
  packagePath: string;
  type: WorkspaceProject['projectType'];
}

export interface Iproject {
  name: string;
  version: string;
  error: boolean;
  dependencies: string;
  peerDependencies?: string;
}

interface IcheckDepsOutput {
  project: string;
  projectPath: string;
  /** JSON.stringify */
  missingDependencies: string;
  /** JSON.stringify */
  invalidFiles?: string;
  unusedDependencies?: string[];
  unusedDevDependencies?: string[];
  usedDependencies?: string;
}



export function setVersionsforDependencies(paths: string[], MAINPACKAGE: IPackageJSON, placeholders: Iplaceholders, version = MAINPACKAGE.version) {
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


function replaceDependencies(dependencies: IDependencyMap, packageAllDeps, placeholders: Iplaceholders, version: string) {
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

function updatePackageJson(path: string, cb: (json: IPackageJSON) => IPackageJSON) {
  FS.readFile(path, 'utf8', (error, jsonString) => {
    if (error) {
      console.log(`Error read file ${path}:`, error);
      return;
    }
    try {
      if (jsonString) {
        const jsonObj: IPackageJSON = JSON.parse(jsonString);
        const content = cb(jsonObj);
        FS.writeFile(path, JSON.stringify(content), err => {
          if (err) {
            console.log('Error writing file', err);
          } else {
            console.log(`Update file ${path}`);
          }
        });
      }
    } catch (err) {
      console.log(`Error parsing JSON `, err);
    }
  });
}


export function getProjects(angularJson: WorkspaceSchema) {
  const projects: ICustomWorkspaceProject[] = [];

  Object.keys(angularJson.projects).forEach((p) => {
    const project = angularJson.projects[p];
    const customWorkspaceProject: ICustomWorkspaceProject = {
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
  return projects; // .filter(item => item.type === 'library');
}

/**
 * build dependency graph from projects
 * TODO check dependencies in libs project name!!!!
 */
export function dependencyGraph(projects: ICustomWorkspaceProject[], packageScope: string, withPeerDeps = false) {
  const nodesmapGraph: Map<string, any> = new Map();
  const edges: [string, string][] = [];
  /**
   * Map of depName: projectName
   */
  const nodes: Map<string, string> = new Map();
  projects.forEach((project) => {
    if (FS.existsSync(project.packagePath)) { // check not working ???
      const projectPackage = require(project.packagePath);
      const packageProjectName = projectPackage.name.replace(packageScope, '');
      nodes.set(packageProjectName, project.name);
      if (projectPackage.dependencies) {

        const projectDeps = Object.keys(projectPackage.dependencies).filter((key) => key.indexOf(packageScope) !== -1).map(key => key.replace(packageScope, ''));
        if (projectDeps.length > 0) {
          const depsObj: Map<string, any> = new Map();
          projectDeps.forEach((dep) => {
            if (nodesmapGraph.has(dep)) {
              depsObj.set(dep, nodesmapGraph.get(dep));
            } else {
              depsObj.set(dep, null);
            }
            edges.push([dep, packageProjectName]);
          });
          nodesmapGraph.set(packageProjectName, depsObj);
        }
      } else {
        nodesmapGraph.set(packageProjectName, null);
      }
    }
  });
  return { edges, nodes, nodesmapGraph };
}

export function getSortedProjects(projects: ICustomWorkspaceProject[], packageScope: string) {
  const graph = dependencyGraph(projects, packageScope);
  const edges = graph.edges;
  const nodes = Array.from(graph.nodes.keys());
  /** toposort array nodes:string[], edges: string[][] */
  const flattdeps = toposort.array(nodes, edges);
  const flattdepsAndProjects: string[] = flattdeps.map(i => {
    const hasKey = graph.nodes.has(i);
    if (hasKey) {
      return graph.nodes.get(i);
    } else {
      return i;
    }
  });

  return flattdepsAndProjects;
}

/**
 * check if all imported dependencies are set in package.json of each library
 */
export function checkDeps(angularJson: WorkspaceSchema, packageScope: string, showAll = false) {
  console.log(`>>> run check dependencies of projects`);
  const projectsPaths = getProjects(angularJson);
  const promises: Promise<IcheckDepsOutput | boolean>[] = [];

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

  const formatDepcheck = (depcheckResults: depcheck.Results, projectName: string, projectPath: string) => {
    const o: IcheckDepsOutput = {
      project: projectName,
      projectPath,
      missingDependencies: JSON.stringify(depcheckResults.missing, null, '\t').replace(/\\\\/g, '/'),
      invalidFiles: JSON.stringify(depcheckResults.invalidFiles, null, '\t').replace(/\\\\/g, '/'), // @babel errors not same as typescript
      unusedDependencies: depcheckResults.dependencies,
      unusedDevDependencies: depcheckResults.devDependencies,
      usedDependencies: JSON.stringify(depcheckResults.using, null, '\t').replace(/\\\\/g, '/')
    };
    const missingDeps = Object.keys(depcheckResults.missing).length;
    if (!missingDeps && !showAll) {
      return false;
    } else {
      return o;
    }
  };

  // function to check if dep is transitive dependency from using...

  const aysncdepcheck = (item: ICustomWorkspaceProject) => {
    return new Promise<IcheckDepsOutput | boolean>((resolve, reject) => {
      depcheck(item.path, options, (results) => {
        const hasMissing = Object.keys(results.missing).length;
        let filteredResults = results;
        if (hasMissing) {
          filteredResults = checkTransitiveDependencies(results, packageScope, options.ignoreMatches);
        }
        const depcheckResults = formatDepcheck(filteredResults, item.name, item.path);
        if (!depcheckResults) {
          resolve(depcheckResults);
        } else {
          resolve(depcheckResults);
        }
      });
    });
  };

  projectsPaths.forEach((item) => {
    if (FS.existsSync(item.packagePath)) {
      promises.push(aysncdepcheck(item));
    }
  });

  return Promise.all(promises).then(result => {
    if (result.length) {
      return result;
    } else {
      console.log('no missing dependencies detected :)');
      return false;
    }
  });
}

/**
 * remove Transitive Dependencies from missing in depcheck!
 */
function checkTransitiveDependencies(depcheckResults: depcheck.Results, packageScope: string, ignoreMatches?: string[]) {
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
    const depPackage: IPackageJSON = require(packagePath); // require(`${key}/package.json`); //
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
