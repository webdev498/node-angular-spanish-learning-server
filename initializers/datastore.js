/**
  This file exports a function that expects an instance of an express application.
  That express application should also have a logger singleton that exposes an error method.
  If the necessary environment variables for connecting to DyanmoDB are not present, the
  server process will exit in an error state and the details of the failure will be written
  to the logger's error stream.

  This function should be imported and executed during boot-time application initialization.
  If access to the datastore cannot be established, the server process must terminate.
*/

export default (application) => {
  application.logger = application.logger || console

  if(!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_ACCESS_KEY) {
    application.logger.error(`Cannot connect to the Database. Missing required credentials`);
    process.exit(1)
  }

  return () => {
    // TODO: Create DyanmoDB instance and set it as a singleton on the application global object
    application.logger.info('Connecting to DynamoDB instance');
  }
}
