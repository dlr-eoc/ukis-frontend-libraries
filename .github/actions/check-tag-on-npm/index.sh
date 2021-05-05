#!/bin/bash

# Check that the tag is not already published on npm
# Usage
# chmod +x index.sh or git update-index --chmod=+x index.sh


#NPM_PACKAGE_NAME=@dlr-eoc/core-ui
#PACKAGE_PATH="./package.json"
#TAG="v7.3.1"
#NPM_PACKAGE_TAGS="v0.4.0-next.1 , v0.4.0-next.2 , v0.9.0, v1.0.0, v1.0.1, v1.0.2, v1.0.3"

# remove refs/tags/ and v
TAG=$(printf "%s" "$TAG" | sed 's/refs\///g; s/tags\///g; s/v//g')
if [ ! "$TAG" ];then
  echo "no tag was provided! ${TAG}"
  exit 1
fi


# get version from repo
repoNpmVersion=$(node -p "require('$PACKAGE_PATH').version")
if [ ! "${repoNpmVersion}" ];then
  echo "no repo version:${repoNpmVersion}"
  exit 1
fi


if [ "${TAG}" != "$repoNpmVersion" ];then
  echo "git tag:${TAG} !== repo:${repoNpmVersion}"
  exit 1
fi


if [ ! "$NPM_PACKAGE_NAME" ];then
  if [ ! "$NPM_PACKAGE_TAGS" ];then
    echo "no package $NPM_PACKAGE_NAME or tags $NPM_PACKAGE_TAGS are provided!"
    exit 1
  fi
fi

# get all versions published: npm show <package> versions
if [ "$NPM_PACKAGE_NAME" ];then
  npmTagsList="$(npm show "$NPM_PACKAGE_NAME" versions)"
fi

if [ "$NPM_PACKAGE_TAGS" ];then
  npmTagsList="$(printf "%s" "$NPM_PACKAGE_TAGS" | sed -e "s/v//g;" )"
fi

# translate multi to single line and replace ' [] ' '
npmTagsStr="$(printf "%s" "$npmTagsList" | tr '\n\r' ' ' | sed -e "s/'//g; s/\[//g; s/\]//g; s/ //g;" )"
if [ ! "${npmTagsList}" ];then
  echo "no tags from npm show: ${npmTagsList}"
  exit 1
fi

# create array from npm Tags string separated by comma
IFS=',' read -r -a npmTags <<<"$npmTagsStr"
#npmTags=("7.0.0" "7.1.0" "7.2.0" "7.3.0-next.0" "7.3.0-next.1" "7.3.0-next.2" "7.3.0-next.3")


# returns 0 if value is in the array
arrayContains () {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

arrayContains "$TAG" "${npmTags[@]}"
# exit status of the last executed command (from the function)
inarray=$?

if [ "$inarray" == 0 ];then
  echo "tag: ${TAG} is already on npm"
  echo "tags: ${npmTags[*]}"
  exit 1
else
  echo "tag: ${TAG} is not on npm"
  echo "tags: ${npmTags[*]}"
  exit 0
fi

