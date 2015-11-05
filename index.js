import 'babel/polyfill';
import Application from './application';

import health from './lib/health';
import exams from './lib/exams';
import datastore from './initializers/datastore';
import logging from './initializers/logging';
import contentNegotiation from './initializers/content-negotiation';
import compression from './initializers/compression';
import cors from './initializers/cross-origin-resources';

export default {
  run: (port) => {
    let application = new Application();

    // Register middleware
    application.initialize(cors);
    application.initialize(datastore);
    application.initialize(logging);
    application.initialize(contentNegotiation);
    application.initialize(compression);

    // Register routes
    application.register(health);
    application.register(exams);

    // Bind and run
    application.bind(port);
  }
};
