#!/bin/sh

# deploy static files to a mountable volumne
rsync -av /frontend/dist/ /static
find /static -type d -exec chmod 0655 {} \;
find /static -type f -exec chmod 0644 {} \;

# no server to start, so this container just waits
#sleep infinity # not available on busybox
#while :; do sleep 2073600; done
