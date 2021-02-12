#!/bin/bash

# Check versions of package.json, tag and npm
# Check if the latest git Tag is the same as the repo npm version
# Check if the repo version is not in the versions published on on npm

# Usage
# chmod +x index.sh or git update-index --chmod=+x index.sh
#PACKAGE_PATH="./package.json"
#NPM_PACKAGE_NAME="@dlr-eoc/core-ui"
#NPM_PACKAGE_TAGS="0.3.0,0.3.0-alpha.1,0.3.0-next,1.0.0-alpha"

# get versions from npm registry
npmTagsStrOrig="$(npm show "$NPM_PACKAGE_NAME" versions)"
npmTagsStr="$(printf "%s" "$npmTagsStrOrig" | sed -e "s/'//g; s/\[//g; s/\]//g; s/ //g")"
if [ ! "${npmTagsStrOrig}" ];then
  echo "no npm tag:${npmTagsStrOrig}"
  exit 1
fi

# get versions from git
latestTagOrig=$(git describe --tags "$(git rev-list --tags --max-count=1)")
latestTag="$(printf "%s" "$latestTagOrig" | sed -e "s/v//g")"
if [ ! "${latestTagOrig}" ];then
  echo "no git tag:${latestTagOrig}"
  exit 1
fi

# get version from repo
repoNpmVersion=$(node -p "require('$PACKAGE_PATH').version")
if [ ! "${repoNpmVersion}" ];then
  echo "no repo version:${repoNpmVersion}"
  exit 1
fi

if [ "$NPM_PACKAGE_TAGS" ]
then
  npmTagsStr="$(printf "%s" "$NPM_PACKAGE_TAGS" | sed -e "s/'//g; s/\[//g; s/\]//g; s/ //g")"
fi

# create array from npm Tags
IFS="," read -r -a npmTags <<< "$npmTagsStr"


if [ "${latestTag}" != "$repoNpmVersion" ];then
  echo "git tag:${latestTag} !== repo:${repoNpmVersion}"
  exit 1
elif [ "${latestTag}" == "$repoNpmVersion" ] && [[ ! ${npmTags[*]} =~ (^|[[:space:]])"$repoNpmVersion"($|[[:space:]]) ]];then
  echo "git tag:${latestTag} == repo:${repoNpmVersion} and repo:${repoNpmVersion} !=~ npm tags:${npmTagsStr}"
  exit 0
else
  echo "repo:${repoNpmVersion} is in npm tags:${npmTagsStr}"
  exit 1
fi
