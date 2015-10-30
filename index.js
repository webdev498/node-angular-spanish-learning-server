import health from './lib/health';
import datastore from './initializers/datastore';
import Application from './application';

export default {
  run: (port) => {
    let application = new Application();
    application.initialize(datastore);
    application.register(health);
    application.bind(port);
  }
}
