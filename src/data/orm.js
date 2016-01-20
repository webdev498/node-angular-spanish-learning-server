import bookshelf from 'bookshelf';
import { getConnection } from './connection';

let orm;

export const getORM = (connection) => {
  orm = (orm || bookshelf(connection || getConnection()));
  return orm;
};
