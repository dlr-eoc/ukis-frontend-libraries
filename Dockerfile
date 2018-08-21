FROM node:9.5-alpine

COPY . /frontend/
COPY src /frontend/


RUN apk update && \
    apk add git rsync && \
    cd /frontend && \
    sed -i '/<base href=/c\<base href="/">' src/index.html && \
    npm install --unsafe-perm && \
    node_modules/.bin/ng build && \
    npm run compodoc && \
    mkdir /static

COPY ./scripts/jenkins/docker-entrypoint.sh /docker-entrypoint.sh


# static files
VOLUME [ "/static" ]

RUN ["chmod", "+x", "/docker-entrypoint.sh"]
CMD [ "/docker-entrypoint.sh" ]
