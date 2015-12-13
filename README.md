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

    $ docker pull deangiberson/aws-dynamodb-local
    $ docker run -d -p 8000:8000 deangiberson/aws-dynamodb-local

To access the JS shell: `http://{docker-host-ip-or-name}:8000/shell`


Be sure to [read the Dockerfile](https://hub.docker.com/r/deangiberson/aws-dynamodb-local/~/dockerfile/) to know exactly what's happening behind the scenes for you.

### Connecting to the DynamoDB backing store

CGI SHE server application will connect to the DynamoDB instance using the [Dynasty library](http://dynastyjs.com/#). Dynasty is a promise-based API that allows for simple querying and CRUD operations of DynamoDB records. Dynasty requires to credentials to connect to DynamoDB:

1. AWS Access Key
2. AWS Sceret Access Key

Access keys can be obtained through the [AWS management console](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html) or from the administrator of this project. **AT NO POINT SHOULD CREDENTIALS FOR AWS BE CHECKED INTO A SOURCE CODE REPOSITORY**. Credentials should be stored and treated as any other shared secret. Do not send credentials through e-mail and do not put credentials in shared documents.

To expose the credentials to the application, simply set the following environment variables before starting the `./server` script:

    $ AWS_ACCESS_KEY=MyFakeAccessKey
    $ AWS_SECRET_ACCESS_KEY=MyFakeSecretAccessKey

The server application will be looking for these variables to be set. If these variables are not present at boot-time, the server process will terminate and display a message in the console (STDERR).

For information on how to use the Dynasty library, please see the documentation at the link above.
