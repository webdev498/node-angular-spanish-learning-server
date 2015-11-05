import Examination from '../../models/Examination';
const TABLE_NAME = 'Examinations';

export default class ExamDataService {
  constructor(datastore) {
    this.provider = datastore ;
  }

  all() {
    return this.provider.all(TABLE_NAME).then(
      (results) => results.map(
        (result) => new Examination(result)
      )
    );
  }

  fetch({ id }) {
    return this.provider.find(TABLE_NAME, { id }).then(
      (result) => new Examination(result)
    );
  }

  create(object) {
    const examination = new Examination(object);
    return new Promise((resolve, reject) => {
      if(examination.isValid()){
        this.provider.instert(TABLE_NAME, object).then(
          (result) => resolve(new Examination(result)),
          (error) => reject(error)
        );
      } else {
        reject(new Error('Examination is not valid'));
      }
    });
  }

  update(object) {
    let { id } = object;
    return this.provider.update(TABLE_NAME, id, object).then(
      (result) => new Examination(result)
    );
  }

  remove({ id }) {
    return this.provider.remove(TABLE_NAME, id);
  }

}
