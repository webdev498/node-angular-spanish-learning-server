import { login } from './../controllers/';

export default server => {
    
  server.route({
    method: 'POST',
    path: '/login',
    handler: login
  });
}