FROM node:9.5-alpine

COPY . /frontend-libraries/



RUN apk update && \
    apk add git rsync && \
    cd /frontend-libraries && \
    rm package-lock.json && \
    npm install --unsafe-perm --registry http://hofer.eoc.dlr.de/nexus/content/groups/npm-all/ && \
    npm run build && \
    ng test dataset-explorer && \
    mkdir /static

COPY ./scripts/jenkins/docker-entrypoint.sh /docker-entrypoint.sh


# static files
VOLUME [ "/static" ]

RUN ["chmod", "+x", "/docker-entrypoint.sh"]
CMD [ "/docker-entrypoint.sh" ]
