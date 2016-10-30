import bookshelf from 'bookshelf';
import connection from './connection';

const Orm = bookshelf(connection);
Orm.plugin('registry');
Orm.plugin('virtuals');

export default Orm;
