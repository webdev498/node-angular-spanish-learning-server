FROM node:6.10.3
LABEL version="0.1"

MAINTAINER Michael Filbin <mike@filb.in>

RUN apt-get update && apt-get install netcat -y

# Build-time Instructions
COPY package.json /usr/app/package.json
COPY src/ /usr/app/src
COPY bin/server /usr/app/bin/server
COPY ./.babelrc  /usr/app/.babelrc
RUN cd /usr/app; npm install
RUN cd /usr/app; node_modules/.bin/babel --babelrc ./.babelrc -d dist src --copy-files


# Runtime operations
ENV PORT=3000 NODE_ENV=production
WORKDIR /usr/app
CMD ["./bin/server"]

EXPOSE 3000
