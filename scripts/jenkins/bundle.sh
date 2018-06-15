#!/bin/sh

## need to replace / in branch names, otherwise tar will fail

tar cfz ukis-mofro-doc.${GIT_BRANCH//[\/]/_}.tar.gz output/documentation
tar cfz ukis-mofro-dist.${GIT_BRANCH//[\/]/_}.tar.gz output/dist
