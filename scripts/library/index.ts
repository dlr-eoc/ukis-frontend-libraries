/**
 * Get and set Version of Library projects from frontend-libraries
 *
 * node scripts/projectsVersion.js -l
 */

import { fork } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';
import { Command } from 'commander';
import { WorkspaceSchema, WorkspaceProject } from '@schematics/angular/utility/workspace-models';

import {
  getProjects, dependencyGraph, Iproject,
  checkDeps, consoleLogColors, getSortedProjects, formatCheckDepsOutput, formatProjectsDepsOutput, updatePackageJson, createNpmrc, setDependencyVersionsInWorkspaces, ICustomWorkspaceProject,
} from './utils';
import { IPackageJSON } from './npm-package.interface';


const CWD = process.cwd();
const MAINPACKAGE: IPackageJSON = require(join(CWD, 'package.json'));
const ANGULARJSON: WorkspaceSchema = require(join(CWD, 'angular.json'));
const LIBRARIES_VERSION = MAINPACKAGE.version;
if (!LIBRARIES_VERSION) {
  console.error(`property version is not set in the root package.json`);
}
const PACKAGE_SCOPE = MAINPACKAGE.projectsScope;
if (!PACKAGE_SCOPE) {
  console.error(`property 'projectsScope' for projects is not set in the root package.json`);
}


interface IgraphOptions {
  projects?: string;
}
function showDependencyGraph(options: IgraphOptions) {
  const filterProjects = options?.projects?.split(',') || false;
  const projects = getProjects(ANGULARJSON);
  const graph = dependencyGraph(projects, PACKAGE_SCOPE, filterProjects);
  console.log(graph.nodesmapGraph);
}

async function runCheckDeps() {
  const allErrors = await checkDeps(ANGULARJSON, PACKAGE_SCOPE);
  if (allErrors.length) {
    allErrors.map(e => formatCheckDepsOutput(e, false));
    console.error(`check for missing dependencies`)
  }
  return allErrors.length;
}

}

function runTests(offset = 0, projects, headless = false) {
  const project = projects[offset];
  const cliArgs = ['test', project, '--watch=false'];
  if (headless) {
    cliArgs.push('--browsers=ChromeHeadless');
  }
  if (project) {
    console.log(consoleLogColors.Bright, `>>> run ng ${cliArgs.join(' ')}`);
    const child = fork(`${__dirname}/run-ng.js`, cliArgs);
    child.on('close', (code, signal) => {
      offset++;
      if (offset >= projects.length) {
        process.exit(0);
      } else {
        runTests(offset, projects, headless);
      }
    });
    child.on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  }
}

interface ItestOptions {
  headless: boolean;
  projects?: string;
}
function testAll(options: ItestOptions) {
  if (options.headless) {
    options.headless = true;
  } else {
    options.headless = false
  }

  const filterProjects = options?.projects?.split(',') || false;
  const testableProjects = getProjects(ANGULARJSON).filter(item => item.test && item.type === 'library');
  const flattdepsAndProjects = getSortedProjects(testableProjects, packageScope, filterProjects);
  runTests(0, flattdepsAndProjects, options.headless);
}

function runBuilds(offset = 0, projects) {
  const project = projects[offset];
  const cliArgs = ['build', '--configuration=production', '--watch=false', project];
  if (project) {
    console.log(consoleLogColors.Bright, `---------------------->>> ${offset + 1}: run ng ${cliArgs.join(' ')}`);
    const child = fork(`${__dirname}/run-ng.js`, cliArgs);
    child.on('close', (code, signal) => {
      offset++;
      if (offset >= projects.length) {
        process.exit(0);
      } else {
        runBuilds(offset, projects);
      }
    });
    child.on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  }
}


interface IbuildOptions {
  projects?: string;
}
/**
 * Builds all projects from projectType = "library" and architect.build
 */
async function buildAll(options: IbuildOptions) {
  const errors = await runCheckDeps();
  /** build ony if there are no missing deps */
  if (errors) {
    process.exit(1);
  } else {

    const filterProjects = options?.projects?.split(',') || false;
    const buildableProjects = getProjects(ANGULARJSON).filter(item => item.build && item.type === 'library');
    const flattdepsAndProjects = getSortedProjects(buildableProjects, packageScope, filterProjects);
    runBuilds(0, flattdepsAndProjects);
  }
}

/**
 * replace versions of all dependencies in projects with the versions of the main package.dependencies
 */
function setVersionsOfProjects(useDistPath = false) {
  let projectsPaths = getProjects(ANGULARJSON).map(item => item.packagePath);
  if (useDistPath) {
    projectsPaths = projectsPaths.map(p => p.replace('projects', 'dist'));
  }
  projectsPaths = projectsPaths.filter(p => existsSync(p));
  const errors = showProjectsAndDependencies(true, false);
  if (!projectsPaths.length) {
    console.log(`there are no build projects, run npm run build first!`);
  }
  if (errors.length) {
    console.log(`check main package.json version and projects for errors!`);
    console.table(errors);
  }
  if (!errors.length && projectsPaths.length) {
    setDependencyVersionsInWorkspaces(MAINPACKAGE, PACKAGE_SCOPE, projectsPaths);
    console.log(`replaced all versions in project workspaces with the versions of the main package.json`);
  }
}

/**
 * replace versions of all dependencies in projects which have placeholders
 */
function updateBuildPackages(registry?: string) {
  let projects = getProjects(ANGULARJSON).filter(item => item.type === 'library')
  let projectsPaths = projects.map(p => p.path.replace('projects', 'dist'));

  projectsPaths = projectsPaths.filter(p => existsSync(p));
  if (!projectsPaths.length) {
    console.log(`there are no build projects, run npm run build first!`);
  }

  if (projectsPaths.length) {

    const packageScope = PACKAGE_SCOPE;
    const repositoryUrl = `git+https://github.com/${process.env.GITHUB_REPOSITORY}.git`;

    projectsPaths.map(p => {
      const packagePath = join(p, 'package.json');
      updatePackageJson(packagePath, (json) => {
        if (!json.repository) {
          json.repository = {} as any;
        }

        if (typeof json.repository === 'object') {
          json.repository.url = repositoryUrl;
          json.repository.type = `git`;
        }
        return json;
      });

      if (typeof registry === 'string') {
        createNpmrc(join(p, '.npmrc'), packageScope, registry);
      } else {
        createNpmrc(join(p, '.npmrc'), packageScope);
      }
    });

    console.log(`update all build projects with repository '${repositoryUrl}' and .npmrc`);
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
      version: projectPackage.version,
      error: false,
      dependencies: null
    };

    if (p.type === 'library' && projectPackage.name.indexOf(PACKAGE_SCOPE) === -1) {
      const error = `name of project: ${projectPackage.name} must be prefixed with the ${PACKAGE_SCOPE} namespace!`;
      if (!silent) {
        console.error(error);
      }
      project.error = true;
      errors.push({ project: projectPackage.name, error });
    }

    if (projectPackage.dependencies) {
      const dependencies = Object.keys(projectPackage.dependencies);
      project.dependencies = dependencies.join(',') || null;
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

export function run() {
  const privPackage = require(join(__dirname, 'package.json'));
  const program = new Command(`node ${privPackage.main}`);
  program.version(privPackage.version, '-v, --vers', 'output the current version of this script')
    .description('Run this script inside of an angular workspace')
    .option('-h, --help ', 'display help for command')
    .option('-l, --list', 'List all projects')
    .option('-d, --deps', 'List all projects in a table with dependencies')
    .option('--peer', '-d --peer: List all projects with dependencies and peerDependencies')
    .option('-s, --set', 'Set versions of all projects in dist folder')
    .option('-u, --update-package <registry>', 'Update package of all projects in dist folder with repo and npm config')
    .option('-g, --graph', 'Show a dependency graph')
    .option('-c, --check', 'Check if all dependencies are listed in the package.json of the projects')
    .option('-t, --test', 'Run ng test for all projects')
    .option('-p, --projects [type]', 'Comma separated list of projects. Run only for specified projects. This is working for test and build and graph')
    .option('--headless', '-t --headless: Run ng test for all projects with ChromeHeadless')
    .option('-b, --build', 'Run ng build for all projects with toposort dependencies')
    .parse(process.argv);
  const options = program.opts();

  if (options.help || !Object.keys(options).length) {
    program.outputHelp();
  }

  if (options.list) {
    listAllProjects();
  } else if (options.deps) {
    if (options.peer) {
      showProjectsAndDependencies(false, true);
    } else {
      showProjectsAndDependencies();
    }
  } else if (options.set) {
    setVersionsOfProjects(true);
  } else if (options.updatePackage) {
    updateBuildPackages(options.updatePackage)
  } else if (options.graph) {
    showDependencyGraph({
      projects: options.projects
    });
  } else if (options.check) {
    runCheckDeps().then(errors => {
      if (errors) {
        process.exit(1);
      }
    });
  } else if (options.test) {
    testAll({
      headless: options.headless,
      projects: options.projects
    });
  } else if (options.build) {
    buildAll({
      projects: options.projects
    }).catch(err => {
      console.log(err);
    });
  }
}
run();



