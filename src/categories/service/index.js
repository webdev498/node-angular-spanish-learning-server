import Category from './../models/Category';
import { logInfo, logError } from './../../logging';

export const create = ({ name }) => {
  logInfo(`Attempting to create a new category "${name}"`);

  return new Promise((resolve, reject) => {
    Category.forge({ name }).save().then(
      category => {
        logInfo(`Successfully created category "${name}" with id ${category.get('id')}`);
        resolve(category);
      },
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
