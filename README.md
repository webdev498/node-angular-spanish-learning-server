# CGI Web Services Tier

This is the future home of the CGI Web Services project. Nothing to see here, please move along

[ ![Codeship Status for josh_king_/cgi-she-server](https://codeship.com/projects/105187a0-a218-0133-f6ea-1ece657cc271/status?branch=master)](https://codeship.com/projects/128764)


## Contributing

### Development-Time dependencies

1. Node version 0.12.0 or later
2. NPM version
3. GNU Make (available through the XCode CLI tools)
4. [Node Inspector](https://github.com/node-inspector/node-inspector)

### Installing Development dependencies

      $ npm install

### Starting the development server

      $ ./bin/dev-server

*If you are running the development server for the first time, you may need to change the execution mode of the file to executable by typeing `chmod +x ./dev-server`*

#### Specifying the TCP port for CGI API

CGI will bind to port 3000 by default; however, if you need to change this behavior, you can set an `PORT` environment variable to an alternative port number prior to starting up the application.

    $ PORT=8000 ./bin/dev-server

### Connecting to the Database

The CGI API uses a PostgreSQL (PGSQL) data store for persistence. You can run PostgreSQL a number of ways, some of which are outlined below. There are several environment variables that are necessary in order to connect to the database:

Variable | Default Value | Usage
-------- | ------------- | -----------------------------------------
DB_HOST  | 'localhost'   | The FQDN of the host running the database
DB_USER  | 'cgi'      | The account database operations will be performed under
DB_PASSWORD | 'cgi'   | The password for the `DB_USER` account
DB_NAME  | 'cgi'      | The name of the database under which cgi data tables will be created

While it is possible to specify each of these variables inline when invoking the server command, this is not very practical. Instead, it is recommend that you write a simple wrapper shell script that will define these variables for you:

```shell
# located somewhere in the source root, but not checked into version control
export DB_HOST='my-host-name';
export DB_USER='joe';
export DB_PASSWORD='secret';
export DB_NAME='walled-garden'
export SECRET='mydirtylittlesecret'
export PORT=8001

./bin/server

```

#### Installing PostgreSQL through Homebrew

PostgreSQL is distributed through the excellent package management tool for OS X, Homebrew. To install PGSQLn through homebrew, simply type:

    $ brew install postgresql

Next, you will need to create a database and user for the CGI Application. You can do this by using your favorite DB management tool ([pgAdmin](http://www.pgadmin.org/) is a popular one). You may also issue shell commands to accomplish the same thing.

To create a user, you may use the [createuser](http://www.postgresql.org/docs/current/static/sql-createuser.html) utility function:

    $ createuser quocha --interactive # follow on screen prompts to complete creating user

Next we need to create a new database for that user. To do so, simply type:

    $ createdb -O quocha quocha # -O {ownder} specifies the role (user) who owns the database

#### Installing PostgreSQL as a Docker container

If you would like to use PostgreSQL as a virtual appliance in a Docker container, it is recommended that you look at the [PostgreSQL image by Paintedfox](https://hub.docker.com/r/paintedfox/postgresql/). There are detailed instructions in the README file at that link, so setup and installation will not be covered here.

### Logging

Logging is configured during start-up of the application. In development mode, logging will be written to the console, but in production output will be written to a Syslog facility.

### Running the Unit Test Suite

The unit test can be run a couple different ways. If you want to run the full suite, simply execute the following from the root of the project directory:

    $ make test

If you want to run your tests from within an IDE like Webstorm, you will probably want to transpile the project with source maps first. To do that type the following from the root of the project directory:

    $ make build-dev

This will create a file watcher that will recompile whenever changes are detected to the project file system. This is particular helpful if you are debugging your unit tests and want to make changes and re-run your tests with minimal overhead.

*It is important to note that the unit tests for this project require bootstrapping. Mocha exposes a --require flag that can be passed a relative path to a script to be required.  You will need to set this up manually if you plan to debug your tests in an IDE. You can use the Makefile as an example of how to set up etc/testing/bootstrapper.js.*


### Commit Message Format and Changelogs

This project uses the Conventional Changelog format for git commit messages. This allows us to generate meaningful changelog information from the metadata in git commit messages. In order for this to work, you must adhere to [these conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit).
