import hasMany from '../../../annotations/hasMany';
import hasOne from '../../../annotations/hasOne';
import serializeable from '../../../annotations/serializeable'
import validateable from '../../../annotations/validateable';

import { serializer, deserializer } from './serialization';
import Choice from './../Choice';

/**
* Question
*
* The Question domain object represents a question on the CGI SHE examination.
* Questions can be of many different types including: multiple choice, true/false
* free text, etc. Questions have a 1 .. * relationship to choices. A
* Question can have many choices, but a choice is specific to only one question.
* Similarly, a quetion has a 1 .. 1 relationshop with a correct choice. the
* correct choice will be among the collection of choices associated with the question.
*
* Question scheme
*
*{
*  "id": UUID,
*  "type:" String,
*  "instructions": String,
*  "text": String,
*  "version": String, //  (cryptographic hash)
*  "choices": Array <Choice>,
*  "correctChoice": Choice,
*  "createdAt": Date,
*  "updatedAt": Date
*}
**/

const VALIDATIONS = [
  (question) => typeof question.text === 'string' && question.text.length > 0,
  (question) => typeof question.type === 'string' && question.type.length > 0,
  (question) => Array.isArray(question.choices),
  (question) => ['1', '2', '3'].includes(question.phase)
];

@serializeable({ serializer, deserializer })
@validateable(VALIDATIONS)
@hasMany(Choice)
@hasOne({correctChoice: Choice})
export default class Question {

  constructor(json){
    this.fromJSON(json);
  }

}
