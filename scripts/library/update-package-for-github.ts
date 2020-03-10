import { updatePackageJson, createNpmrc } from './utils';

const CWD = process.cwd();
const PATH = require('path');

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

createNpmrc(PATH.join(CWD, '.npmrc'), packageScope);
