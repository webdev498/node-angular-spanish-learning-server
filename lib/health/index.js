import router from './routing';
import express from 'express';


export default (application = express()) => {

  application.use('/health', router(application));

  return application;

};

