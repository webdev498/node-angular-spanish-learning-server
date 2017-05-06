//@flow

import { createLogger } from 'bucker';
import { inspect } from 'util';
import type { Server } from 'http/index';

const loggerOptions = {};
let loggerSingleton = {
  error: () => {},
  warn: () => {},
  info: () => {},
  debug: () => {}
};

if (process.env.NODE_ENV === 'production') {

  const { SYSLOG_HOST, SYSLOG_PORT }  = process.env;

  Object.assign(loggerOptions, {
    name: 'Production Logger',
    level: 'info',
    console: true,
    syslog: {
      host: SYSLOG_HOST,
      port: SYSLOG_PORT
    }
  });

} else {

  Object.assign(loggerOptions, {
    name: 'Development Logger',
    level: 'debug',
    console: {
      color: true
    }
  });

}



export const register = (server: Server, options: Object, next: Function) => {
  loggerSingleton = createLogger(loggerOptions);

  server.on('response', (request) => {
    const { id, info, method, path, paramsArray, payload } = request;
    loggerSingleton.info(`## ${ id } ## ${ info.remoteAddress } - ${ method }: ${ path } \n params: ${ inspect(paramsArray) } \n body: ${ inspect(payload) }`);
  });

  server.on('request-error', (request, error) => {
    const { id } = request;
    loggerSingleton.error(`Internal Server Error - Request ID: ${ id } \n ${error.stack}`);
  });

  server.on('start', () => {
    const { uri } = server.info;
    loggerSingleton.info(`Server running at: ${ uri }`);
  });

  server.on('route', (route) => {
    loggerSingleton.info(`Server registered route at: ${ route.method } ${ route.path }`);
  });

  next();
};

register.attributes = {
  name: 'Logging service',
  version: '0.0.1'
};

export const logger = () => loggerSingleton;
export function logError() { loggerSingleton.error(...arguments); }
export function logInfo() { loggerSingleton.info(...arguments); }
export function logWarning() { loggerSingleton.warn(...arguments); }
export function logTrace() { loggerSingleton.debug(...arguments); }
