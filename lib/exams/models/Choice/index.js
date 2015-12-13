import serializeable from '../../../annotations/serializeable'
import validateable from '../../../annotations/validateable';

import { serializer, deserializer } from './serialization';

/**
* Choice
*
* The Choice domain object represents a possible answer to a question.*
* Choice scheme
*
*{
*  "id": UUID,
*  "text": String,
*  "selected": Boolean,
*  "version": String, //  (cryptographic hash)
*  "createdAt": Date,
*  "updatedAt": Date
*}
**/



const VALIDATIONS = [
  (choice) => typeof choice.text === 'string' && choice.text.length > 0,
  (choice) => typeof choice.selected === 'boolean'
];

@serializeable({ serializer, deserializer })
@validateable(VALIDATIONS)
export default class Choice {
  constructor (json){
    this.fromJSON(json);
  }
}
