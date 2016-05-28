import bookshelf from 'bookshelf';
import connection from './connection';

const Orm = bookshelf(connection);
Orm.plugin('registry');

export default Orm;
