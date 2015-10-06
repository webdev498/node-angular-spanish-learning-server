import express from 'express';
import health from './lib/health';

const application = express();

health(application);

application.listen(process.env.SERVER_PORT);
console.log(`Running on port ${process.env.SERVER_PORT}`);

export default application;