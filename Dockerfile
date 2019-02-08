FROM node:9.5-alpine

COPY . /frontend-libraries/



RUN apk update && \
    apk add git rsync && \
    apk add chromium && \
    cd /frontend-libraries && \
    rm package-lock.json && \
    npm install --unsafe-perm --registry http://hofer.eoc.dlr.de/nexus/content/groups/npm-all/ && \
    npm run test -- --watch=false --progress=true --browsers=ChromeHeadless  && \
    npm run build && \    
    mkdir /static

COPY ./scripts/jenkins/docker-entrypoint.sh /docker-entrypoint.sh


# static files
VOLUME [ "/static" ]

RUN ["chmod", "+x", "/docker-entrypoint.sh"]
CMD [ "/docker-entrypoint.sh" ]
