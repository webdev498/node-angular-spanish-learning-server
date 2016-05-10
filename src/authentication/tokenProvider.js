import jwt from 'jsonwebtoken';
import * as UserService from './../users/service';

const { TOKEN_EXPIRATION, SECRET } = process.env;

const options = {
  algorithm: 'HS256',
  expiresIn: TOKEN_EXPIRATION || '365d',
  issuer: 'urn:cgi:authentication',
  subject: 'urn:cgi:user'
};

export const jwtAuthOptions = {
  key: SECRET,
  validateFunc: validate,
  verifyOptions: options
};

export const sign = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(payload, SECRET, options, (token) => {
        resolve(token);
      });
    } catch (error) {
      reject(error);
    }
  });
};

function validate(decodedToken, request, callback) {
  UserService.get(decodedToken).then((user) => {
    if (user && user.get('active')) {
      return callback(null, true);
    }
    return callback(null, false);
  });
}
