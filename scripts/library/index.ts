/**
 * Get and set Version of Library projects from frontend-libraries
 *
 * node scripts/projectsVersion.js -l
 */

import * as NG from '@angular/cli';
import * as PATH from 'path';
import * as FS from 'fs';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import { IPackageJSON } from './npm-package.interface';


import { setVersionsforDependencies, Iplaceholders, getProjects, dependencyGraph, Iproject, checkDeps, consoleLogColors, getSortedProjects } from './utils';



const packageScope = '@dlr-eoc/';
const CWD = process.cwd();
const MAINPACKAGE: IPackageJSON = require(PATH.join(CWD, 'package.json'));
const ANGULARJSON: WorkspaceSchema = require(PATH.join(CWD, 'angular.json'));
const LIBRARIES_VERSION = MAINPACKAGE.version;
const placeholders: Iplaceholders = {
  libVersion: '0.0.0-PLACEHOLDER',
  vendorVersion: '0.0.0-PLACEHOLDER-VENDOR'
};

function showDependencyGraph() {
  const projects = getProjects(ANGULARJSON);
  const graph = dependencyGraph(projects, packageScope);
  console.log(graph.nodesmapGraph);
}

async function runCheckDeps() {
  const allErrors = await checkDeps(ANGULARJSON, packageScope);
  if (allErrors && Array.isArray(allErrors)) {
    allErrors.map(error => {
      if (error && typeof error === 'object') {

        const str = `
-----------------------------------------------------------
project:  ${error.project}
projectPath:  ${error.projectPath}
missingDependencies:${error.missingDependencies}
peerDependencies:${error.unusedDependencies}
unusedDevDependencies:${error.unusedDevDependencies}
invalidFiles:${error.invalidFiles}
usedDependencies:${error.usedDependencies}`;
        console.log(str);
      }
    });
  }
}

function runTests(offset = 0, projects) {
  const project = projects[offset];
  const options = {
    cliArgs: ['test', '--watch=false', project]
  };

  if (project) {
    console.log(consoleLogColors.Bright, `>>> run ng ${options.cliArgs.join(' ')}`);
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
  const testableProjects = getProjects(ANGULARJSON).filter(item => item.test && item.type === 'library');
  const flattdepsAndProjects = getSortedProjects(testableProjects, packageScope);
  runTests(0, flattdepsAndProjects);
}

function runBuilds(offset = 0, projects) {
  const project = projects[offset];

  const options = {
    cliArgs: ['build', '--watch=false', project]
  };

  if (project) {
    console.log(consoleLogColors.Bright, `>>> run ng ${options.cliArgs.join(' ')}`);
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


async function buildAll() {
  let result = await checkDeps(ANGULARJSON, packageScope);
  /** build ony if there are no missing deps */
  console.log(result)
  if (result && Array.isArray(result)) {
    result = result.filter(i => i !== false);
  }
  if (result && Array.isArray(result) && result.length) {
    throw new Error(`check for missing dependencies`);
  } else {
    const buildableProjects = getProjects(ANGULARJSON).filter(item => item.build && item.type === 'library');
    const flattdepsAndProjects = getSortedProjects(buildableProjects, packageScope);
    console.log(flattdepsAndProjects)
    // runBuilds(0, flattdepsAndProjects);
  }
}

/**
 * replace versions of all dependencies in projects which have placeholders
 */
function setVersionsOfProjects(useDistPath = false) {
  let projectsPaths = getProjects(ANGULARJSON).map(item => item.packagePath);
  if (useDistPath) {
    projectsPaths = projectsPaths.map(p => p.replace('projects', 'dist'));
  }
  projectsPaths = projectsPaths.filter(p => FS.existsSync(p));
  const errors = projectsAndDependencies(true);
  if (!errors.length) {
    setVersionsforDependencies(projectsPaths, MAINPACKAGE, placeholders);

    console.log(`replaced all versions in projects with '${placeholders.libVersion}' and '${placeholders.vendorVersion}' with the versions of the main package.json`);
  } else {
    console.log(`check main package.json version and projects for errors!`);
    console.table(errors);
  }
}

function listAllProjects() {
  const projectsPaths = getProjects(ANGULARJSON);
  const list = projectsPaths.reduce((p, n) => {
    const relPath = n.path.split(PATH.join(CWD, '/'))[1].replace(/\\/g, '/');
    return p + '- ' + `[${n.name}](${relPath}/README.md)` + '\n';
  }, '');
  console.log(list);
}

function projectsAndDependencies(silent = false, showPeer = false) {
  const projects: Iproject[] = [],
    projectsPeer: Iproject[] = [],
    errors: { project: string, error: string }[] = [],
    projectsPaths = getProjects(ANGULARJSON);

  projectsPaths.forEach((project) => {
    const projectPackage = require(project.packagePath);
    const _project: Iproject = {
      name: projectPackage.name,
      version: projectPackage.version.replace('0.0.0', LIBRARIES_VERSION),
      error: false,
      dependencies: null
    };

    if (projectPackage.version !== placeholders.libVersion) {
      const error = `version of project: ${projectPackage.name} must be ${placeholders.vendorVersion} for build!`;
      if (!silent) {
        console.error(error);
      }
      _project.error = true;
      errors.push({ project: projectPackage.name, error });
    }

    if (projectPackage.name.indexOf(packageScope) === -1) {
      const error = `name of project: ${projectPackage.name} must be prefixed with the ${packageScope} namespace!`;
      if (!silent) {
        console.error(error);
      }
      _project.error = true;
      errors.push({ project: projectPackage.name, error });
    }

    if (projectPackage.dependencies) {
      const dependencies = Object.keys(projectPackage.dependencies);
      _project.dependencies = dependencies.join(',') || null;

      Object.keys(projectPackage.dependencies).forEach((key) => {
        const dep = projectPackage.dependencies[key];
        if (key.indexOf(packageScope) !== -1 && dep !== placeholders.libVersion) {
          const error = `version of dependency: ${key} in project: ${projectPackage.name}
                    must be ${placeholders.libVersion} for build!`;
          if (!silent) {
            errors.push({ project: projectPackage.name, error });
          }
          _project.error = true;
          errors.push({ project: projectPackage.name, error });
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
-s, --set               Set versions of all projects in projects folder
--setInDist         Set versions of all projects in dist folder
-g, --graph             Show a dependency graph
-c, --check             Check if all dependencies are listed in the package.json of the project
-t, --test              Run ng test for all projects
-b, --build             Run ng build fal all projects with toposort dependencies`);
}

export function run() {
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
    } else if (arg === '--setInDist') {
      setVersionsOfProjects(true);
    } else if (arg === '-g' || arg === '--graph') {
      showDependencyGraph();
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



