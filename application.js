import express from 'express';

class Application {

  constructor(server = express()){
    this.server = server;
  }

  register(route){
    route(this.server);
  }

  initialize(middleware) {
    middleware.call(null, this.server);
  }

  bind(port){
  let http = this.server.listen(port, () => {
      this.server.emit('listening', http.address());
    });
  }

}

export default Application;
