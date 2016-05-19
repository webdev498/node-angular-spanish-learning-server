import User from '../models/User';
import { logError, logInfo } from './../../logging';

const withRelated = ['nationality', 'addresses', 'telephones'];


export const signup = (userInfo) => {

  const telephones = userInfo.telephones || [];
  const addresses = userInfo.addresses || [];

  logInfo(`Attempting to register new user: ${ userInfo.firstName } ${ userInfo.lastName}`);

  return new Promise((resolve, reject) => {
    User.forge(userInfo)
    .save()
    .tap((user) => {
      const userId = user.get('id');

      const promises = telephones.map((telephone) => user.related('telephones').create(Object.assign(telephone, { userId })))
        .concat(addresses.map((address) => user.related('addresses').create(Object.assign(address, { userId }))));

      return Promise.all(promises);
    })
    .then(
        (user) => {
          resolve(user);
        },
        (error) => {
          logError(error);
          reject(error);
        }
      )
      .catch((exception) => {
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
          withRelated
        }).then(
        resolve,
        (error) => {
          logError(error);
          reject(error);
        }
    ).catch((exception) => {
      logError(exception);
      reject(exception);
    });
  });
};

export const get = ({ id }) => {
  logInfo(`Fetching user with id: ${id}`);

  return new Promise((resolve,reject) => {
    User.forge({ id })
      .fetch({
        require: false,
        withRelated
      }).then(
      resolve,
      (error) => {
        logError(error);
        reject(error);
      }
    ).catch((exception) => {
      logError(exception);
      reject(exception);
    });
  });
};

export const getByEmail = (email) => {
  logInfo(`Fetching user with email: ${email}`);

  const withRelated = ['nationality', 'addresses', 'telephones'];
  return new Promise((resolve, reject) => {
    User.where({ email })
    .fetch({
      require:false,
      withRelated
    }).then((user) => {
       resolve(user);
    }, (error) => {
      logError(error);
      reject(error);
    }).catch((exception) => {
      logError(exception);
      reject(exception);
    });
  });
};

export const update = ({ params, payload }) => {
  const { id } = params;

  logInfo(`Updating user with id: ${id} and params ${payload}`);
  return new Promise((resolve, reject) => {
    get(params).then(
      (user) => {
        user.save(payload, {patch: true})
          .then(() => resolve(user))
          .catch((error) => {
            logError(error);
            reject(error);
          });
      }).catch((exception) => {
        logError(exception);
        reject(exception);
    });
  });
};
