import Application from './application';

import health from './lib/health';
import datastore from './initializers/datastore';
import logging from './initializers/logging';
import contentNegotiation from './initializers/content-negotiation';
import compression from './initializers/compression';

export default {
  run: (port) => {
    let application = new Application();
    // Register middleware
    application.initialize(datastore);
    application.initialize(logging);
    application.initialize(contentNegotiation);
    application.initialize(compression);

    // Register routes
    application.register(health);

    // Bind and run
    application.bind(port);
  }
}
