#!/bin/bash

# Check if commit of Tag which is pushed, is already in the main remote branch.
# This should be true if the version was set by [npm-version](https://docs.npmjs.com/cli/v6/commands/npm-version)
# And the commit is merged in the main branch by a pull request

# Usage
# chmod +x index.sh or git update-index --chmod=+x index.sh
# ----------------------------------------------------------
#BRANCH="origin/main"
#COMMITID="latestTag"
#COMMITID="refs/tags/v0.9.0"

# https://stackoverflow.com/questions/10649814/get-last-git-tag-from-a-remote-repo-without-cloning
# https://git-scm.com/docs/git-ls-remote
# get tags from remote git sorted by version and only show last row with commit stripped of
#latestTagOnRemote=$(git ls-remote --tags --refs --sort="version:refname" origin | awk -F/ 'END{print$NF}')
#latestTagOnRemote=$(git ls-remote --tags --refs --sort="version:refname" origin | tail -n1 | sed 's/.*\///; s/v//g')

# get commit or latest tag
if [ "$COMMITID" == 'latestTag' ];then
  # get latest tag in fetched repo
  # https://git-scm.com/docs/git-rev-list
  # https://git-scm.com/docs/git-describe
  # get latest commit for tags in the fetched repo and print it as tag
  COMMITID=$(git describe --tags "$(git rev-list --tags --max-count=1)")
  if [ ! "${COMMITID}" ];then
    echo "no git tag:${COMMITID}"
    exit 1
  fi
else
  COMMITID=$(printf "%s" "$COMMITID" | sed 's/refs\///g; s/tags\///g;')
fi

echo "tag to check:${COMMITID}"



# Check if commit/tag is in main remote branch
# https://git-scm.com/docs/git-branch#Documentation/git-branch.txt---containsltcommitgt
# https://git-scm.com/docs/git-rev-parse
branchesWhichContain="$(git branch -r --contains "$(git rev-parse "$COMMITID")" )"
# Check is in branch
commitInBranch="$(printf "%s" "$branchesWhichContain" | grep "$BRANCH")"

if [ ! "$commitInBranch" ];then
  echo "${COMMITID} not in ${BRANCH}"
  exit 1
else
  echo "${COMMITID} is in ${BRANCH}"
  exit 0
fi
