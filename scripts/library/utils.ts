import { IPackageJSON } from './npm-package.interface';
import { readFile, writeFile, existsSync, readFileSync } from 'fs';
import { WorkspaceSchema, WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { join } from 'path';

import * as depcheck from 'depcheck';
import * as toposort from 'toposort';

const CWD = process.cwd();

import { sync as browserifyResolve } from 'resolve';

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
}


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

export interface IcheckDepsOutput {
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

type RecursiveMap = Map<string, RecursiveMap>;

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

export function updatePackageJson(path: string, cb: (json: IPackageJSON) => IPackageJSON) {
  readFile(path, 'utf8', (error, jsonString) => {
    if (error) {
      console.log(`Error read file ${path}:`, error);
      return;
    }
    try {
      if (jsonString) {
        const jsonObj = jsonParse<IPackageJSON>(jsonString);
        const content = cb(jsonObj);
        writeFile(path, json2String(content), err => {
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

export function createNpmrc(path: string, scope: string, registry = 'https://npm.pkg.github.com') {
  /** https://github.com/actions/setup-node/blob/v2/src/authutil.ts */
  const npmrc = `
    ${scope}:registry=${registry}:_authToken=${process.env.NODE_AUTH_TOKEN}
    loglevel = "verbose"`;

  try {
    if (path) {
      writeFile(path, npmrc, err => {
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
}


export function getProjects(angularJson: WorkspaceSchema) {
  const projects: ICustomWorkspaceProject[] = [];

  Object.keys(angularJson.projects).forEach((p) => {
    const project = angularJson.projects[p];
    const customWorkspaceProject: ICustomWorkspaceProject = {
      name: p,
      path: join(CWD, project.root),
      packagePath: join(CWD, project.root, 'package.json'),
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


/**
 * build dependency graph from all Projects in angular.json 'projects'
 * get the dependencies for each project from it'spackage.json
 *
 * Use all Projects to get child dependencies as well
 */
export function dependencyGraph(projects: ICustomWorkspaceProject[], packageScope: string, filter?: string[] | false) {
  const buildableProjects = projects.map(p => p.name);
  const nodesmapGraph: Map<string, RecursiveMap> = new Map();
  const edges: [string, string][] = [];
  /**
   * Map of depName: projectName
   */
  const nodes: string[] = [];
  projects.forEach((project) => {
    if (existsSync(project.packagePath)) {
      const projectPackage: IPackageJSON = require(project.packagePath);
      const packageProjectName = projectPackage.name.replace(packageScope, '');
      nodes.push(packageProjectName);
      // also get projectPackage.devDependencies and projectPackage.peerDependencies

      let projectDeps: string[] = null;
      let projectDevDeps: string[] = null;
      let projectPeerDeps: string[] = null;
      if (projectPackage.dependencies) {
        projectDeps = Object.keys(projectPackage.dependencies).filter((key) => key.indexOf(packageScope) !== -1).map(key => key.replace(packageScope, ''));
        addDepsOfProject(projectDeps, buildableProjects, packageProjectName, nodesmapGraph, edges)
      }

      if (projectPackage.devDependencies) {
        projectDevDeps = Object.keys(projectPackage.devDependencies).filter((key) => key.indexOf(packageScope) !== -1).map(key => key.replace(packageScope, ''));
        addDepsOfProject(projectDevDeps, buildableProjects, packageProjectName, nodesmapGraph, edges)
      }

      if (projectPackage.devDependencies) {
        projectPeerDeps = Object.keys(projectPackage.devDependencies).filter((key) => key.indexOf(packageScope) !== -1).map(key => key.replace(packageScope, ''));
        addDepsOfProject(projectPeerDeps, buildableProjects, packageProjectName, nodesmapGraph, edges)
      }

      if (!projectDeps?.length || !projectDevDeps?.length || !projectPeerDeps?.length) {
        // if project has no dependencies at all
        nodesmapGraph.set(packageProjectName, null);
      }
    }
  });
  // fill all null childs not get in the first iteration
  traverseUpdate(nodesmapGraph, nodesmapGraph);

  if (filter) {
    const filteredGraph: Map<string, RecursiveMap> = new Map();
    filter.forEach(projectName => {
      if (nodesmapGraph.has(projectName)) {
        filteredGraph.set(projectName, nodesmapGraph.get(projectName));
      }
    });


    const projectsDeps: string[] = edges.filter(e => filter.includes(e[0])).map(e => e[1]).filter((item, index, array) => array.indexOf(item) === index);
    projectsDeps.forEach(item => {
      if (filter.indexOf(item) === -1) {
        filter.push(item);
      }
    });
    const filteredEdges: [string, string][] = edges.filter(e => filter.includes(e[0]));

    return { edges: filteredEdges, nodes, nodesmapGraph: filteredGraph };
  } else {
    return { edges, nodes, nodesmapGraph };
  }

}

function addDepsOfProject(dependencies: string[], buildableProjects: string[], packageProjectName: string, nodesmapGraph: Map<string, RecursiveMap>, edges: [string, string][]) {
  if (dependencies.length) {
    const depsObj: Map<string, any> = new Map();
    dependencies.forEach((dep) => {
      if (buildableProjects.includes(dep)) {
        if (nodesmapGraph.has(dep)) {
          depsObj.set(dep, nodesmapGraph.get(dep));
        } else {
          depsObj.set(dep, null);
        }
        edges.push([packageProjectName, dep]);
      }
    });
    nodesmapGraph.set(packageProjectName, depsObj);
  } else {
    // if project has no dependencies with packageScope
    nodesmapGraph.set(packageProjectName, null);
  }
}


function traverseUpdate(map: RecursiveMap, lookupTree: Map<string, RecursiveMap>) {
  if (map.size) {
    for (const [key, value] of map.entries()) {
      if (!value) {
        // if value of the key is null and the key is in the tree, replace the map key with the tree key if it is not null
        if (lookupTree.has(key)) {
          const treeKey = lookupTree.get(key);
          if (treeKey) {
            map.set(key, treeKey);
          }
        }
      }
      if (value instanceof Map) {
        traverseUpdate(value, lookupTree);
      }
    }
  }
}


export function getSortedProjects(projects: ICustomWorkspaceProject[], packageScope: string, filter?: string[] | false) {
  const gne = dependencyGraph(projects, packageScope, filter);
  /** An array of directed edges describing a graph e.g. edge1   */
  const edges = gne.edges;
  const flattdeps = toposort(edges).reverse();
  return flattdeps;
}

/**
 * check if all imported dependencies are set in package.json of each library
 */
export async function checkDeps(angularJson: WorkspaceSchema, packageScope: string, showAll = false) {
  console.log(`>>> run check dependencies of projects`);
  const projectsPaths = getProjects(angularJson);
  const projectResults: IcheckDepsOutput[] = [];

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
      '**/*.ts': depcheck.parser.typescript
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
      missingDependencies: json2String(depcheckResults.missing),
      invalidFiles: json2String(depcheckResults.invalidFiles), // @babel errors not same as typescript
      unusedDependencies: depcheckResults.dependencies,
      unusedDevDependencies: depcheckResults.devDependencies,
      usedDependencies: json2String(depcheckResults.using)
    };
    const missingDeps = Object.keys(depcheckResults.missing).length;
    if (!missingDeps && !showAll) {
      return false;
    } else {
      return o;
    }
  };

  // function to check if dep is transitive dependency from using...
  const aysncdepcheck = async (item: ICustomWorkspaceProject) => {
    if (existsSync(item.packagePath)) {
      const results = await depcheck(item.path, options);
      if (results) {
        const hasMissing = Object.keys(results.missing).length;
        let filteredResults = results;
        if (hasMissing) {
          filteredResults = checkTransitiveDependencies(results, packageScope, options.ignoreMatches);
        }
        return formatDepcheck(filteredResults, item.name, item.path);
      }
    } else {
      return;
    }
  };

  for (const p of projectsPaths) {
    const res = await aysncdepcheck(p);
    if (res) {
      projectResults.push(res);
    }
  }
  return projectResults;
}

export function formatCheckDepsOutput(error: IcheckDepsOutput, showUsed = false) {
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

export function formatProjectsDepsOutput(p: Iproject, i: number) {
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
      packagePath = join(CWD, packagePath.replace(packageScope, 'projects/'));
    }
    const allPackageDeps = [];
    // Resolve package path and then read package.json with FS because some packages do not list ./package.json on there exports so if we require the package.json an error occurres.
    // Package subpath './package.json' is not defined by "exports"
    const resPackagePath = browserifyResolve(packagePath);
    const depPackage = jsonParse<IPackageJSON>(readFileSync(resPackagePath, 'utf-8'));

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


/**
 * inspired by https://github.com/npm/json-parse-even-better-errors/blob/latest/lib/index.js#L77
 */
type TjsonObj = { [k: string | symbol]: any; };
function jsonParse<T>(text: string) {
  text = String(text).replace(/^\uFEFF/, '');

  const formatRE = /^\s*[{[]((?:\r?\n)+)([\s\t]*)/;
  const emptyRE = /^(?:\{\}|\[\])((?:\r?\n)+)?$/;
  const [, newline = '\n', indent = '  '] = text.match(emptyRE) || text.match(formatRE) || [null, '', ''];

  let json: TjsonObj = JSON.parse(text);
  // catch duplicate stringified objects
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }

  if (json && typeof json === 'object') {
    json[Symbol.for('newline')] = newline;
    json[Symbol.for('indent')] = indent;
  }

  return json as T & TjsonObj;
}

function json2String(json: TjsonObj) {
  const indent = json[Symbol.for('indent')];
  const newline = json[Symbol.for('newline')];

  const format = indent === undefined ? '  ' : indent
  const eol = newline === undefined ? '\n' : newline
  return `${JSON.stringify(json, null, format)
    }\n`.replace(/\n/g, eol)
}
