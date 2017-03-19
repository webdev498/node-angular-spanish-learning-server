import bookshelf from 'bookshelf';
import connection from './connection';

type ObjectRelationalMapper = {
  prototype: {
    initialize: () => void;
  };
  plugin: (pluginName: string) => void;
  extend: (classDefinition: Object) => BookshelfModel;
  model: (modelName: string, modelImpl: BookshelfModel) => BookshelfModel;
};


const Orm: ObjectRelationalMapper = bookshelf(connection);
Orm.plugin('registry');
Orm.plugin('virtuals');

export default Orm;
