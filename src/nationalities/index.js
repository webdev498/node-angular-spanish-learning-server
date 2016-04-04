import routing from './routing';

const name = 'Nationality resource service';
const version = '0.0.1';

export const register = (server, options, next) => {
  routing(server);
  next();
};

register.attributes = {
  name,
  version
};
