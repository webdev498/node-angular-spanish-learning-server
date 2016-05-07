FROM node:5
LABEL version="0.1"

MAINTAINER Michael Filbin <mike@filb.in>

# Build-time Instructions
COPY package.json /usr/app/package.json
COPY src/ /usr/app/src
COPY ./.babelrc  /usr/app/.babelrc
RUN cd /usr/app; npm install
RUN cd /usr/app; node_modules/.bin/babel --babelrc ./.babelrc -d dist src


# Runtime operations
ENV PORT=3000 NODE_ENV=production
WORKDIR /usr/app
CMD ["node", "dist/index.js"]

EXPOSE 3000
