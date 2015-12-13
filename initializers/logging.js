import winston from 'winston';
import { inspect } from 'util';

const now = () => new Date().toUTCString();

const buildRequestLogEntry = (request) => {
  let { ip, method, originalUrl, params, query } = request;
  return `REQUEST >> ${now()} [${ip}] ${method} : ${originalUrl} \n params: ${inspect(params)} \n query: ${inspect(query)} `;
};

const buildResponseLogEntry = (response) => {
  let { statusCode, statusMessage,  request, body } = response;
  return `RESPONSE >> ${now()} [${request.ip}] ${statusCode} : ${statusMessage} \n body: ${inspect(body)} `;
};

export default (application) => {

  let level  = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

  const logger = new winston.Logger({
    level,
    transports: [
      new (winston.transports.Console)()
    ]
  });



  const requestMiddleware = (request, response, next) => {
    logger.info(buildRequestLogEntry(request));
    next();
  };

  const errorMiddleware = (error, request, response, next) => {
    logger.error(buildResponseLogEntry(response));
    logger.error(error.stack);
    next();
  };

  application.use(requestMiddleware);
  application.use(errorMiddleware);

  application.on('listening', ({ address, port, family }) => {
    logger.info(`Listening at ${ address }:${ port } using ${ family } `);
  });

  /**
    This is probably not a good long term solution.
    We'll need to think of a good way to handle distributing global
    Singleton objects without appending them as properties to 'application'
  */
  application.logger = logger;


};
