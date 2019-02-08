#!/bin/sh
#add user for which the files need to be accessible later 
echo $USERNAME
adduser -D -u $UserID $USERNAME

# deploy static files to a mountable volumne
mkdir /static/dist
rsync -av /frontend-libraries/dist/ /static/dist


find /static -type d -exec chmod 0755 {} \;
find /static -type f -exec chmod 0644 {} \;
chown -R $USERNAME /static
# no server to start, so this container just waits
#sleep infinity # not available on busybox
#while :; do sleep 2073600; done
