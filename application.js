import express from 'express';
import OS from 'os';

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
    this.server.listen(port);
    console.log(`Listening at ${OS.hostname()}:${port} `);
  }

}

export default Application;
