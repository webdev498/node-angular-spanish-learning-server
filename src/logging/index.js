import { createLogger } from 'bucker';
import { inspect } from 'util';

let options = {};
let loggerSingleton;

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


export const decorate = server => {

  loggerSingleton = createLogger(options);

  server.on('response', request => {
    const { id, info, method, path, paramsArray, payload } = request;
    loggerSingleton.info(`## ${ id } ## ${ info.remoteAddress } - ${ method }: ${ path } \n params: ${ inspect(paramsArray) } \n body: ${ inspect(payload) }`);
  });

  server.on('request-error', (request, error) => {
    const { id } = request;
    loggerSingleton.error(`Internal Server Error - Request ID: ${ id } \n Error: ${ inspect(error) }`);
  });

  server.on('start', () => {
    const { uri } = server.info;
    loggerSingleton.info(`Server running at: ${ uri }`);
  });

  server.on('route', route => {
    loggerSingleton.info(`Server registered route at: ${ route.method } ${ route.path }`);
  });

};

export const logger = () => loggerSingleton;

export function logError() { loggerSingleton.error(...arguments); }
export function logInfo() { loggerSingleton.info(...arguments); }
export function logWarning() { loggerSingleton.warn(...arguments); }
export function logTrace() { loggerSingleton.debug(...arguments); }
