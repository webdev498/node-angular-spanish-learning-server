import Status from './../models/Status';

class HealthController {

  constructor(){
  }

  show(request, response, next) {
    response.json(new Status());
    next();
  }
}

export default HealthController;
