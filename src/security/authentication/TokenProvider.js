//@flow
import jwt from 'jsonwebtoken';

type jwtOptions = {
  algorithm: string;
  expiresIn: string;
  issuer: string;
  subject: string;
};

export default class TokenProvider {
  options: jwtOptions;
  secret: ?string;

  constructor(options: jwtOptions, secret: ?string) {
    this.options = options;
    this.secret = secret;
  }

  async sign(payload: Object) {
    return new Promise((resolve, reject) => {
      try {
        jwt.sign(payload, this.secret, this.options, resolve);
      } catch (error) {
        reject(error);
      }
    });
  }
}
