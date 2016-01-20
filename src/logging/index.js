import { createLogger } from 'bucker';
import { inspect } from 'util';

let options = {};
let localLogger;

if (process.env.NODE_ENV === 'production') {

  const { SYSLOG_HOST, SYSLOG_PORT, SYSLOG_FACILITY }  = process.env;

  Object.assign(options, {
    name: 'Production Logger',
    level: 'info',
    syslog: {
      host: SYSLOG_HOST,
      port: SYSLOG_PORT,
      facility: SYSLOG_FACILITY
    }
  });

} else {

  Object.assign(options, {
    name: 'Development Logger',
    level: 'debug',
    console: {
      color: true
    }
  });

}


export const decorate = (server) => {

  localLogger = createLogger(options);

  server.on('response', (request) => {
    const { id, info, method, path, paramsArray, payload } = request;
    localLogger.info(`## ${ id } ## ${ info.remoteAddress } - ${ method }: ${ path } \n params: ${ inspect(paramsArray) } \n body: ${ inspect(payload) }`);
  });

  server.on('request-error', (request, error) => {
    const { id } = request;
    localLogger.error(`Internal Server Error - Request ID: ${ id } \n Error: ${ inspect(error) }`);
  });

  server.on('start', () => {
    const { uri } = server.info;
    localLogger.info(`Server running at: ${ uri }`);
  });

  server.on('route', (route) => {
    localLogger.info(`Server registered route at: ${ route.method } ${ route.path }`);
  });

};

export const logger = () => localLogger;
