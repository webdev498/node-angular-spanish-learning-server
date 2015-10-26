import express from 'express';



let port = process.env.SERVER_PORT || 4001

let bootHandlers = [];

const application = express();

application.services = {
  register: (service) => service(application)
};

application.initializers = {
  register: (initializer) =>  bootHandlers.push(initializer(application))
}


application.boot = () => {
  bootHandlers.forEach((handle) => handle());
  application.listen(port);
  console.log(`Running on port ${port}`);
};





export default application;
