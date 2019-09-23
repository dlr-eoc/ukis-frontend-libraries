#! /bin/bash 

#set -x # print out all commands
set -e # exit on error


echo "building and copying into project $1 ...."



if [[ $# -eq 0 ]] ; then
    echo 'please pass a target-name as argument'
    exit 0
fi


targetname=$1
scriptdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
basedir=$(readlink -f $scriptdir/../..)
sourcedir=$basedir/frontend-libraries/dist/
targetdir=$basedir/$targetname/node_modules/@ukis/

cd $basedir/frontend-libraries/

while inotifywait -r -e modify,create,delete ./projects; do
    npm run build
    rsync -avz ./dist/ $targetdir; 
done
