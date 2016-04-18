import * as UserService from './../../users/service';
import * as TokenProvider from './../../authentication/tokenProvider';
import * as ServiceErrorFactory from './../../exceptions/Factory';
import { UNAUTHORIZED } from './../../http/statusCodes';

export const login = (request, reply) => {
  const { email, password } = request.payload;
  
  return UserService.getByEmail(email).then((user) => {
      if(user && user.validatePassword(password)) {
        TokenProvider.sign(user.sanitize()).then(token => {
        return reply({token});
      });
      } else {
          reply({authenticated: false}).statusCode = UNAUTHORIZED;
      }
    },
    error => {
      let serviceError = ServiceErrorFactory.create(request, error);
      reply(serviceError).statusCode = serviceError.statusCode;
  });
}