import { inspect } from 'util';
import RecordNotFoundException from '../../lib/exceptions/RecordNotFoundException';

export default class LokiAdapter {
  constructor(database, logger){
    this.database = database;
    this.logger = logger;
    ['Examinations', 'Questions'].forEach(this.createTable.bind(this));
  }

  createTable(tableName, options){
    this.logger.info(`Creating table ${tableName} with options ${inspect(options)}`);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.database.addCollection(tableName));
      } catch (exception) {
        this.logger.error(exception);
        reject(exception);
      }
    });
  }

  dropTable(tableName) {
    this.logger.info(`Dropping table ${tableName}`);
    return new Promise((resolve, reject) => {
      this.logger.info(`Successfully dropped table ${tableName}`);
      reject(new Error('Not Implemented'));
    });
  }

  listTables(){
    return new Promise((resolve, reject) => {
      try {
        resolve(this.database.listColections().map((collection) => collection.name));
      } catch (exception) {
        reject(exception);
      }
    });
  }

  find(tableName, options){
    this.logger.info(`Searching ${tableName} for ${inspect(options)}`);
    return new Promise((resolve, reject) => {
      try {
        let record = this.database.getCollection(tableName).findOne(options);
        if(record) {
          resolve(resolve);
        } else {
          reject(new RecordNotFoundException(`Unable to find record with id: ${options.id}`));
        }
      } catch (exception){
        reject(exception);
      }
    });
  }

  findAll(tableName, options){
    this.logger.info(`Searching ${tableName} for all records matching ${inspect(options)}`);
    return new Promise((resolve, reject) => {
      try {
        this.logger.info(`Successfully found records`);
        resolve(this.database.getCollection(tableName).find(options));
      } catch (exception){
        reject(exception);
      }
    });
  }

  insert(tableName, object) {
    const self = this;
    this.logger.info(`LokiAdapter: Inserting ${inspect(object)} into ${tableName}`);
    return new Promise((resolve, reject) => {
      try {
        let result = self.database.getCollection(tableName).insert(object.toJSON());
        resolve(result);
      } catch (exception) {
        self.logger.error(exception);
        reject(exception);
      }
    }).catch((error) => {
      self.logger.error(error);
      throw error;
    });
  }

  remove(tableName, hashKey) {
    return new Promise((resolve, reject) => {
      try {
        this.database.getCollection(tableName).remove(hashKey);
        resolve();
      } catch (exception) {
        this.logger.error(exception);
        reject(exception);
      }
    });
  }

  update(tableName, hashKey, object) {
    this.logger.info(`LokiAdapter: Updating ${tableName} with id of ${hashKey} and payload ${inspect(object)}`);
    return new Promise((resolve, reject) => {
      try {
        let target = this.database.getCollection(tableName).findOne({id : {$eq: hashKey}});
        if ( target ) {
          this.database.getCollection(tableName).update(Object.assign(target, object));
          resolve(object);
        } else {
          let exception = new RecordNotFoundException(`Could not record in table: ${tableName} with id: ${ hashKey }`);
          reject(exception);
        }
      } catch (exception) {
        this.logger.error(exception);
        reject(exception);
      }
    });
  }

  all(tableName) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.database.getCollection(tableName).where(() => true));
      } catch (exception) {
        this.logger.error(exception);
        reject(exception);
      }
    });
  }

}
