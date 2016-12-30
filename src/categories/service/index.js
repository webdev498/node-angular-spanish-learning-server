import Category from './../models/Category';
import { logInfo, logError } from './../../logging';

export const create = ({ name }) => {
  logInfo(`Attempting to create a new category "${name}"`);

  return new Promise((resolve, reject) => {
    Category.forge({ name }).save().then(
      (category) => {
        logInfo(`Successfully created category "${name}" with id ${category.get('id')}`);
        resolve(category);
      },
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

export const all = () => {
  logInfo("Fetching all categories");
  return new Promise((resolve, reject) => {
    Category.where({active: true}).fetchAll().then(resolve, reject);
  });
};

export const other = () => {
  logInfo("Fetching other category");
  return new Promise((resolve, reject) => {
    Category.where({name: 'Other'}).fetchAll().then(resolve, reject);
  });
}

export const random = (limit: number) => {
  logInfo("Fetching random categories");
  return new Promise((resolve, reject) => {
    Category.where({name: 'Other'}).orderByRaw('random()').limit(limit).fetchAll().then(resolve, reject);
  });
}

export const remove = ({ id }) => {
  logInfo(`Soft deleting category with id: ${id}`);
  return new Promise((resolve, reject) => {
    Category.forge({ id }).save({active: false}).then(resolve, reject);
  });
};

export const update = ({ id, name }) => {
  logInfo(`Soft deleting category with id: ${id}`);
  return new Promise((resolve, reject) => {
    Category.forge({ id }).save({ name }).then(resolve, reject);
  });
};
