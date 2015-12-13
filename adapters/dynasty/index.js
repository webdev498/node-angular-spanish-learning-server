export default class DynastyAdapter {
  constructor(database, logger){
    this.database = database;
    this.logger = logger;
  }

  createTable(tableName, options){
    return new Promise((resolve, reject) => {
      this.database.create(tableName, options).then(
        (response) => resolve(response),
        (exception) => {
          this.logger.error(exception);
          reject(exception);
        }
      );
    });
  }

  dropTable(tableName) {
    return new Promise((resolve, reject) => {
      this.database.drop(tableName).then(
        (success) => resolve(success),
        (exception) => {
          this.logger.error(exception);
          reject(exception);
        }
      );
    });
  }

  listTables(){
    return new Promise((resolve, reject) => {
      this.database.list().then(
        (response) => resolve(response.TableNames),
        (exception) => {
          this.logger.error(exception);
          reject(exception);
        }
      );
    });
  }

  find(tableName, options){
    return new Promise((resolve, reject) => {
      this.database.table(tableName).find(options).then(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  findAll(tableName, hasKey){
    return new Promise((resolve, reject) => {
      this.database.table(tableName).findAll(hasKey).then(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

  insert(tableName, object) {
    return new Promise((resolve, reject) => {
      this.database.table(tableName).insert(object).then(
        (object) => resolve(object),
        (error) => reject(error)
      );
    });
  }

  remove(tableName, hashKey) {
    return new Promise((resolve, reject) => {
      this.database.table(tableName).remove(hashKey).then(
        (object) => resolve(object),
        (error) => reject(error)
      );
    });
  }

  update(tableName, hashKey, object) {
    return new Promise((resolve, reject) => {
      this.database.table(tableName).update(hashKey, object).then(
        (object) => resolve(object),
        (error) => reject(error)
      );
    });
  }

  all(tableName) {
    return new Promise((resolve, reject) => {
      this.database.table(tableName).scane().then(
          (results) => resolve(results),
          (error) => reject(error)
      );
    });
  }

}
