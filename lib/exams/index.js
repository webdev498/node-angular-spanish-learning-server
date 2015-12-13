import { examRouter, questionRouter } from './routing';
import express from 'express';


export default (application = express()) => {
  application.use('/examinations', examRouter(application));
  application.use('/questions', questionRouter(application));
  return application;
};
