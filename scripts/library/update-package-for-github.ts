import { updatePackageJson, createNpmrc } from './utils';

const CWD = process.cwd();
const PATH = require('path');
const args = process.argv.slice(2);

const packagePath = PATH.join(CWD, 'package.json');
const packageScope = '@dlr-eoc';
const repositoryUrl = `git+https://github.com/${process.env.GITHUB_REPOSITORY}.git`;

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

/** TODO: maybe use yargs - it is installed anyway by other modules */
const registryIsSet = args.indexOf('--registry');
if (registryIsSet !== -1) {
  const registry = args[registryIsSet + 1];
  createNpmrc(PATH.join(CWD, '.npmrc'), packageScope, registry);
} else {
  createNpmrc(PATH.join(CWD, '.npmrc'), packageScope);
}
