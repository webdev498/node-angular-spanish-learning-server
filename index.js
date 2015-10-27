import health from './lib/health';
import datastore from './initializers/datastore';
import application from './server';

// Register initializers
application.initializers.register(datastore);

// Register services
application.services.register(health);

// Boot application
application.boot();
