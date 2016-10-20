import routing from './routing';

export const register = (server, options, next) => {
  routing(server);
  next();
};

register.attributes = {
  name: 'Nationality resource service',
  version: '0.0.1'
};
