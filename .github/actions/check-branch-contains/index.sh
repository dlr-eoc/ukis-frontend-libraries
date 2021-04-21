#!/bin/bash

# Check versions of package.json, tag and npm
# Check if the latest git Tag is the same as the repo npm version
# Check if the repo version is not in the versions published on on npm

# Usage
# chmod +x index.sh or git update-index --chmod=+x index.sh
#MAIN_BRANCH="origin/master"


# get versions from git
latestTagOrig=$(git describe --tags "$(git rev-list --tags --max-count=1)")
latestTag="$(printf "%s" "$latestTagOrig" | sed -e "s/v//g")"
if [ ! "${latestTagOrig}" ];then
  echo "no git tag:${latestTagOrig}"
  exit 1
fi

# check if commit/tag is in remote master branch
# befor run git remote prune github
remoteBranchContains="$(git branch -r --contains "$(git rev-parse v"$latestTag")" )"
commitInMainBranch="$(printf "%s" "$remoteBranchContains" | grep "$MAIN_BRANCH")"

if [ ! "$commitInMainBranch" ];then
  echo "v${latestTag} not in ${MAIN_BRANCH}"
  exit 1
fi
