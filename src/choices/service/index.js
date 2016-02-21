import Choice from '../models/Choice';
import { logger } from './../../logging';

export const create = ({ text, translation, phase, active }) => {
logger().info(`Attempting to create new choice: ${ text} with attributes - translation: ${translation} phase: ${phase} active: ${active}`);

  return new Promise((resolve, reject) => {
    Choice.forge({
      text,
      translation,
      phase,
      active
    })
    .save()
    .then(
        choice => { resolve(choice); },
        error => {
          logger().error(error);
          reject(error);
        }
      )
      .catch(exception => {
        logger().error(exception);
        reject(exception);
      }
    );
  });

};

export const update = ({ id }, { text, translation, version, phase, active }) => {
  const params = { text, translation, version, phase, active};
  const attributes = omitEmptyProperties(params);

  logger().info(`Attempting to update choice with id: ${ id } and attributes: ${ JSON.stringify(attributes) }`);
  return new Promise((resolve, reject) => {
    Choice.forge({ id })
      .save(attributes, {patch: true}).then(
        choice => {
          logger().info(`Successfully updated Choice with id: ${ id }`);
          resolve(choice);
        },
        error => {
          logger().error(error);
          reject(error);
        }
      )
      .catch(exception => {
        logger().error(exception);
        reject(exception);
      });
  });
};

export const all = () => {
  logger().info('Fetching all choices.');
  return new Promise((resolve, reject) => {
    Choice.fetchAll({required: false}).then(
      choices => {
        logger().info(`Retrieved ${choices.length} choices from the database`);
        resolve(choices);
      },
      exception => {
        logger().error(exception);
        reject(exception);
      }
    );
  });
};


const omitEmptyProperties = object => {
  return Object.keys(object).filter(key => !!object[key]).reduce((memo, property) => {
    memo[property] = object[property];
    return memo;
  }, {});
};
