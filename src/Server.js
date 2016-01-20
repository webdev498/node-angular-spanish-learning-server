import Hapi from 'hapi';

export default class Server extends Hapi.Server {
  constructor(options){
    super(options);
  }
}
