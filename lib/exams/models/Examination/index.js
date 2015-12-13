import hasMany from '../../../annotations/hasMany';
import serializeable from '../../../annotations/serializeable'
import validateable from '../../../annotations/validateable';

import { serializer, deserializer } from './serialization';
import Question from '../Question';

/**

* Examination Schema
*{
*   "id": "7c417eee-e8e8-46be-bfc7-0cd14754105a",
*   "title": "Introduction to Astronomy",
*   "instructions": "To begin this examination, ...",
*   "version": "79250ced4d4e16e94d9957b51f175eac",
*   "refs": {
*     "self": "/examinations/7c417eee-e8e8-46be-bfc7-0cd14754105a",
*     "questions": "examinations/7c417eee-e8e8-46be-bfc7-0cd14754105a/questions"
*   },
*   "createdAt": "Tue, 03 Nov 2015 14:49:04 GMT",
*   "updatedAt": "Tue, 03 Nov 2015 14:49:04 GMT"
* }

**/

const VALIDATIONS = [
  (examination) => typeof examination.title === 'string' && examination.title.length > 0,
  (examination) => typeof examination.instructions === 'string' && examination.instructions.length > 0,
  (examination) => Array.isArray(examination.questions) && examination.questions.length && examination.questions.every(question => question instanceof Question)
];

@hasMany(Question)
@serializeable({ serializer, deserializer})
@validateable(VALIDATIONS)
export default class Examination {
  constructor(json) {
    this.fromJSON(json);
  }
}
