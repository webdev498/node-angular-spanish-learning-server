import compression from 'compression';

export default (application) => {
  application.use(compression());
};
