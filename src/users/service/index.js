import User from '../models/User';
import { logger } from './../../logging';

export const signup = ({ firstName, lastName, email, password, passwordConfirmation }) => {
  logger().info(`Attempting to register new user: ${ firstName } ${ lastName}`);

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
        (user) => {
          resolve(user);
        },
        (error) => {
          logger().error(error);
          reject(error);
        }
      )
      .catch((exception) => {
        logger().error(exception);
        reject(exception);
      }
    );
  });

};
