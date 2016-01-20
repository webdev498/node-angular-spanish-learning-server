import knex from 'knex';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const host = DB_HOST || 'localhost';
const user = DB_USER || 'cgi';
const password = DB_PASSWORD || 'cgi';
const database = DB_NAME || 'cgi';
const charset = 'utf8';

let connection;

export const getConnection = () => {
  connection = (connection || knex({
    debug: process.env.NODE_ENV !== 'production',
    client: 'postgresql',
    connection: { host, user, password, database, charset }
  }));
  return connection;
};
