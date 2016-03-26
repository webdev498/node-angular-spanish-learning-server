import User from '../models/User';
import { logError, logInfo } from './../../logging';

export const signup = ({ payload }) => {

  const telephones = payload.telephones || [];
  const addresses = payload.addresses || [];

  logInfo(`Attempting to register new user: ${ payload.firstName } ${ payload.lastName}`);

  return new Promise((resolve, reject) => {
    User.forge(payload)
    .save()
    .tap(user => {
      const userId = user.get('id');

      const promises = telephones.map(telephone => user.related('telephones').create(Object.assign(telephone, { userId })))
        .concat(addresses.map(address => user.related('addresses').create(Object.assign(address, { userId }))));

      return Promise.all(promises);
    })
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

  const withRelated = ['nationality', 'addresses', 'telephones'];
  return new Promise((resolve, reject) => {
    User.forge()
        .fetchAll({
          require: false,
          withRelated
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

export const update = ({ params, payload }) => {
  const { id } = params;

  logInfo(`Updating user with id: ${id} and params ${payload}`);
  return new Promise((resolve, reject) => {
    return User.forge({ id })
    .save(payload, { patch: true })
    .then(
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
