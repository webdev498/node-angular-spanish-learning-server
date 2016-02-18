import jwt from 'jsonwebtoken';

const { TOKEN_EXPIRATION, SECRET } = process.env;


const options = {
  algorithm: 'HS256',
  expiresIn: TOKEN_EXPIRATION || '365d',
  issuer: 'urn:cgi:authentication',
  subject: 'urn:cgi:user'
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
