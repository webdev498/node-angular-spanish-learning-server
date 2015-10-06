# Common Grounds International
## Medical Spanish Examination Application (Web Services)

### Introduction


### Installation

    make install

#### Run-time Dependencies
* Node.js ~> 4.0.0

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
