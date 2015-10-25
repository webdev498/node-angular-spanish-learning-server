# Common Grounds International
## Medical Spanish Examination Application (Web Services)

### Introduction


### Installation

    make install

#### Run-time Dependencies
* Node.js ~> 4.0.0
* GNU Make - Available through XCode CLI tools or through your distributions package manager

### Development-Time Dependencies
These dependencies are in addition to the run-time dependencies listed above.
* NPM ~> 4.0.0


### Running the application

    export SERVER_PORT=8080
    make build
    node ./dist/index.js
    
### Debugging the application

    make build-dev
    node ./dist/debug/index.js # => Includes source maps for debugger


### Testing

All tests whould be included in a `**/specs/` directory and assume this file extension convention: `**.spec.js`.

To run the unit tests, simply execute:

    make test
    
If you want code coverage analytics, then run:

    make coverage

The code coverage report will be located at: `$PROJECT_ROOT/coverage`


### Running the DynamoDB Backing Store

DynamoDB is a schemaless datastore from Amazon that allows Redis-style key/value data where keys may be a composite and values can include multiple data types including BSON documents.

DynamoDB can be run a couple of ways:

#### Standalone JAR file

You can download and run DynamoDB from the commandline using Java and the distributed JAR file.

See the documentation here: http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html

for details.


#### As a Docker container

It may be easier to run the DynamoDB store as a Docker container. The container will handle ensuring you have all the necessary configuration and dependencies in place. It will also manage startup and shutdown of the of the DynamoDB instance.

For Mac OS X, we recommend installing and using [Docker Toolbox](https://docs.docker.com/installation/mac/). You can then pull a DynamoDB container from [DockerHub](https://hub.docker.com/) - take a look at [ryanratcliff/dynamodb](https://hub.docker.com/r/ryanratcliff/dynamodb/).

This will expose DynamoDB to your localhost where you can interact with it from the browser or from the CGI SHE server application.

    $ docker pull ryanratcliff/dynamodb
    $ docker run -d -P ryanratcliff/dynamodb
    
To access the JS shell: `http://localhost:8000/shell`


Be sure to [read the Dockerfile](https://hub.docker.com/r/ryanratcliff/dynamodb/~/dockerfile/) to know exactly what's happening behind the scenes for you.