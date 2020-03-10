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
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';


import {
  setVersionsforDependencies, Iplaceholders, getProjects, dependencyGraph, Iproject,
  checkDeps, consoleLogColors, getSortedProjects, formatCheckDepsOutput, formatProjectsDepsOutput
} from './utils';



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
  if (allErrors.length) {
    allErrors.map(e => formatCheckDepsOutput(e, false));
  }
}

function runTests(offset = 0, projects, headless = false) {
  const project = projects[offset];
  const options = {
    cliArgs: ['test', project, '--watch=false']
  };
  if (headless) {
    options.cliArgs.push('--browsers=ChromeHeadless');
  }

  if (project) {
    console.log(consoleLogColors.Bright, `>>> run ng ${options.cliArgs.join(' ')}`);
    NG.default(options).then((result) => {
      offset++;
      if (offset >= projects.length) {
        process.exit(0);
      } else {
        runTests(offset, projects, headless);
      }
    });
  }
}

function testAll(headless = false) {
  const testableProjects = getProjects(ANGULARJSON).filter(item => item.test && item.type === 'library');
  const flattdepsAndProjects = getSortedProjects(testableProjects, packageScope);
  runTests(0, flattdepsAndProjects, headless);
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
  const result = await checkDeps(ANGULARJSON, packageScope);
  /** build ony if there are no missing deps */
  if (result.length) {
    result.map(e => formatCheckDepsOutput(e, false));
    throw new Error(`check for missing dependencies`);
  } else {
    const buildableProjects = getProjects(ANGULARJSON).filter(item => item.build && item.type === 'library');
    const flattdepsAndProjects = getSortedProjects(buildableProjects, packageScope);
    runBuilds(0, flattdepsAndProjects);
  }
}

/**
 * replace versions of all dependencies in projects which have placeholders
 */
function setVersionsOfProjects(useDistPath = false) {
  let projectsPaths = getProjects(ANGULARJSON).filter(item => item.type === 'library').map(item => item.packagePath);
  if (useDistPath) {
    projectsPaths = projectsPaths.map(p => p.replace('projects', 'dist'));
  }
  projectsPaths = projectsPaths.filter(p => FS.existsSync(p));
  const errors = showProjectsAndDependencies(true, false);
  if (!projectsPaths.length) {
    console.log(`there are no build projects, run npm run build first!`);
  }
  if (errors.length) {
    console.log(`check main package.json version and projects for errors!`);
    console.table(errors);
  }
  if (!errors.length && projectsPaths.length) {
    setVersionsforDependencies(projectsPaths, MAINPACKAGE, placeholders);
    console.log(`replaced all versions in projects with '${placeholders.libVersion}' and '${placeholders.vendorVersion}' with the versions of the main package.json ${MAINPACKAGE.version}`);
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

function showProjectsAndDependencies(silent = false, showPeer = false, projectType?: WorkspaceProject['projectType']) {
  const projects: Iproject[] = [];
  const projectsPeer: Iproject[] = [];
  const errors: { project: string, error: string }[] = [];

  let projectsPaths = getProjects(ANGULARJSON);
  if (projectType) {
    projectsPaths = getProjects(ANGULARJSON).filter(item => item.type === projectType);
  }

  projectsPaths.forEach((p) => {
    const projectPackage = require(p.packagePath);
    const project: Iproject = {
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
      project.error = true;
      errors.push({ project: projectPackage.name, error });
    }

    if (p.type === 'library' && projectPackage.name.indexOf(packageScope) === -1) {
      const error = `name of project: ${projectPackage.name} must be prefixed with the ${packageScope} namespace!`;
      if (!silent) {
        console.error(error);
      }
      project.error = true;
      errors.push({ project: projectPackage.name, error });
    }

    if (projectPackage.dependencies) {
      const dependencies = Object.keys(projectPackage.dependencies);
      project.dependencies = dependencies.join(',') || null;

      Object.keys(projectPackage.dependencies).forEach((key) => {
        const dep = projectPackage.dependencies[key];
        if (key.indexOf(packageScope) !== -1 && dep !== placeholders.libVersion) {
          const error = `version of dependency: ${key} in project: ${projectPackage.name}
                    must be ${placeholders.libVersion} for build!`;
          if (!silent) {
            errors.push({ project: projectPackage.name, error });
          }
          project.error = true;
          errors.push({ project: projectPackage.name, error });
        }
      });
    }
    // without peerDeps
    projects.push(project);
    // --------------------------------------
    const newProject = Object.assign({}, project);
    if (projectPackage.peerDependencies) {
      const peerDependencies = Object.keys(projectPackage.peerDependencies);
      newProject.peerDependencies = peerDependencies.join(',') || null;
    }
    projectsPeer.push(newProject);
  });

  if (!silent) {
    if (showPeer) {
      projectsPeer.map(formatProjectsDepsOutput);
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
      & --peer            List all projects with dependencies and peerDependencies
  -s, --set               Set versions of all projects in dist folder
  -g, --graph             Show a dependency graph
  -c, --check             Check if all dependencies are listed in the package.json of the project
  -t, --test              Run ng test for all projects
      & --headless        Run ng test for all projects with ChromeHeadless
  -b, --build             Run ng build fal all projects with toposort dependencies`);
}

export function run() {
  const args = process.argv.slice(2);
  if (args.includes('-h') || args.includes('--help')) {
      showHelp();
  } else if (args.includes('-l') || args.includes('--list')) {
      listAllProjects();
  } else if ((args.includes('-d') || args.includes('--deps')) && args.includes('--peer')) {
    showProjectsAndDependencies(false, true);
  } else if (args.includes('-d') || args.includes('--deps')) {
      showProjectsAndDependencies();
  } else if (args.includes('-s') || args.includes('--set')) {
      setVersionsOfProjects(true);
  } else if (args.includes('-g') || args.includes('--graph')) {
      showDependencyGraph();
  } else if (args.includes('-c') || args.includes('--check')) {
      runCheckDeps();
  } else if ((args.includes('-t') || args.includes('--test')) && args.includes('--headless')) {
    testAll(true);
  } else if (args.includes('-t') || args.includes('--test')) {
      testAll();
  } else if (args.includes('-b') || args.includes('--build')) {
      buildAll().catch(err => {
        console.log(err);
      });
    }


  if (!args.length) {
    showHelp();
  }
}
run();



