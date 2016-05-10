import Choice from '../models/Choice';
import { logInfo, logError } from './../../logging';

export const create = ({ text, translation, phase, active }) => {
logInfo(`Attempting to create new choice: ${ text} with attributes - translation: ${translation} phase: ${phase} active: ${active}`);

  return new Promise((resolve, reject) => {
    Choice.forge({
      text,
      translation,
      phase,
      active
    })
    .save()
    .then(
        (choice) => { resolve(choice); },
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

export const update = ({ id }, { text, translation, version, phase, active }) => {
  const params = { text, translation, version, phase, active};
  const attributes = omitEmptyProperties(params);

  logInfo(`Attempting to update choice with id: ${ id } and attributes: ${ JSON.stringify(attributes) }`);

  return new Promise((resolve, reject) => {
    Choice.forge({ id })
      .save(attributes, {patch: true}).then(
        (choice) => {
          logInfo(`Successfully updated Choice with id: ${ id }`);
          resolve(choice);
        },
        (error) => {
          logError(error);
          reject(error);
        }
      )
      .catch((exception) => {
        logError(exception);
        reject(exception);
      });
  });
};

export const all = () => {
  logInfo('Fetching all choices.');
  return new Promise((resolve, reject) => {
    Choice.fetchAll({withRelated: ['categories']}).then(
      (choices) => {
        logInfo(`Retrieved ${choices.length} choices from the database`);
        resolve(choices);
      },
      (exception) => {
        logError(exception);
        reject(exception);
      }
    );
  });
};


const omitEmptyProperties = (object) => {
  return Object.keys(object)
    .filter((key) => !!object[key])
    .reduce((memo, property) => {
      memo[property] = object[property];
      return memo;
    }, {});
};
