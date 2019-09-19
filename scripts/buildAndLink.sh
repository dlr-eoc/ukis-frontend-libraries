#! /bin/bash 

#set -x # print out all commands
set -e # exit on error


echo "building and linking library $1 into project $2 ...."


if [[ $# -eq 0 ]] ; then
    echo 'please pass a library-name as first argument'
    exit 0
fi
if [[ $# -eq 1 ]] ; then
    echo 'please pass a target-name as second argument'
    exit 0
fi

projectname=$1
targetname=$2
scriptdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
basedir=$(readlink -f $scriptdir/../..)
sourcedir=$basedir/frontend-libraries/dist/$projectname
targetdir=$basedir/$targetname/node_modules/@ukis/$projectname

cd $basedir/frontend-libraries/

read -p "Build all libraries first? [y/N]" response
if [[ $response == "y" ]]
then
    npm install
    npm run build
fi

rm -rf $targetdir
ln -s $sourcedir $targetdir
ng build $projectname --watch