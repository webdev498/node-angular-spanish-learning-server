import Nationality from '../models/Nationality';
import { logError, logInfo } from './../../logging';

export const all = () => {
  logInfo('Fetching all users');

  return new Promise((resolve, reject) => {
    Nationality.forge()
        .fetchAll()
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
