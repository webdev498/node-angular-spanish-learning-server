import knex from 'knex';
import mockKnex from 'mock-knex';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const host = DB_HOST || 'localhost';
const user = DB_USER || 'cgi';
const password = DB_PASSWORD || 'cgi';
const database = DB_NAME || 'cgi';
const port = DB_PORT || 5432;
const charset = 'utf8';

const connection = knex({
  debug: process.env.NODE_ENV !== 'production',
  client: 'postgresql',
  connection: { host, port, user, password, database, charset }
});

if(process.env.NODE_ENV === 'test') {
  mockKnex.mock(connection);
}

export default connection;
