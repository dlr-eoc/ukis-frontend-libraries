#!/bin/bash

# Check versions of package.json, tag and npm
# Check if the latest git Tag is the same as the repo npm version
# Check if the repo version is not the same as the latest version on npm (normally it would be better to check if the version is higher but this is more complicated)
# Usage
# chmod +x index.sh or git update-index --chmod=+x index.sh

latestTag=$(git describe --tags "$(git rev-list --tags --max-count=1)")
packageVersion=$(node -p "require('$PACKAGE_PATH').version")
latestNpmVerion=$(npm show "$NPM_PACKAGE_NAME" version)

if [ "$NPM_PACKAGE_VERSION" ]
then
  latestNpmVerion="$NPM_PACKAGE_VERSION"
fi

if [ "${latestTag:1}" == "$packageVersion" ] && [ "$packageVersion" != "$latestNpmVerion" ]
then
  echo "Tag:${latestTag} == repo:${packageVersion} && repo:${packageVersion} != npm:${latestNpmVerion}"
  exit 0
else
  echo "Tag:${latestTag} ?== repo:${packageVersion} && repo:${packageVersion} ?== npm:${latestNpmVerion}"
  exit 1
fi
