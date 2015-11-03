import winston from 'winston';
import { inspect } from 'util';

export default (application) => {

  let level  = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

  const logger = new winston.Logger({
    level,
    transports: [
      new (winston.transports.Console)()
    ]
  });


  const now = () => new Date().toUTCString()

  const requestMiddleware = (request, response, next) => {
    logger.info(`${now()} [${request.ip}] ${request.method} : ${request.originalUrl} \n params: ${inspect(request.params)} \n query: ${inspect(request.query)} `);
    next();
  };

  const errorMiddleware = (error, req, res, next) => {
    logger.error(error.stack);
    next();
  };

  application.use(requestMiddleware);
  application.use(errorMiddleware);

  /**
    This is probably not a good long term solution.
    We'll need to think of a good way to handle distributing global
    Singleton objects without appending them as properties to 'application'
  */

  application.logger = logger;

}
