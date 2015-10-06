import { Router } from 'express';
import HealthController from './../controllers';

export default (application) => {
  const router = Router();

  const controller = new HealthController(application);

  router.get('/status', controller.show);

  return router;
}
