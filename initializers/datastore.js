import dynastyConnectionFactory from 'dynasty';
import DynastyAdapter from '../adapters/dynasty';
import LokiAdapter from '../adapters/loki';
import loki from 'lokijs';

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
  application.logger = application.logger || console;
  const { logger } = application;

  if(process.env.DATASTORE === 'transient') {
    application.datastore = new LokiAdapter(new loki('cgi.json'), logger);
    application.logger.info('Connection to in-memory datastore');
  } else {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, DATASTORE_HOST, DATASTORE_PORT } = process.env;

    if(!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      application.logger.error(`Cannot connect to the Database. Missing required credentials`);
      process.exit(1);
    } else if(DATASTORE_HOST) {
      application.logger.info(`Connecting to local datastore instance at ${DATASTORE_URI}`);
    }

    application.datastore = new DynastyAdapter(dynastyConnectionFactory({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    }, `${DATASTORE_HOST}:${DATASTORE_PORT || 8000}`), logger);

    application.logger.info('Connecting to Amazon DynamoDB');
  }

};
