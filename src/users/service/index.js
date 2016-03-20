import User from '../models/User';
import { logError, logInfo } from './../../logging';

export const signup = ({ firstName, lastName, email, password, passwordConfirmation }) => {
  logInfo(`Attempting to register new user: ${ firstName } ${ lastName}`);

  return new Promise((resolve, reject) => {
    User.forge({
      firstName,
      lastName,
      email,
      passwordConfirmation,
      password
    })
    .save()
    .then(
        user => {
          resolve(user);
        },
        error => {
          logError(error);
          reject(error);
        }
      )
      .catch(exception => {
        logError(exception);
        reject(exception);
      }
    );
  });

};

export const all = () => {
  logInfo('Fetching all users');

  return new Promise((resolve, reject) => {
    User.forge()
        .fetchAll({
          require: false,
          columns: ['id', 'first_name', 'last_name', 'active', 'created_at', 'updated_at']
        }).then(
        resolve,
        error => {
          logError(error);
          reject(error);
        }
    ).catch(exception => {
      logError(exception);
      reject(exception);
    });
  });

};
