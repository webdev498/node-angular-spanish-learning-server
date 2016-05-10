import EmptyTextError from './../exceptions/EmptyTextError';

 const VALIDATION_STRATEGIES = [
   (text) => typeof text === 'string',
   (text) => text.length > 0
 ];

 export default ({ text }) => {
   let isValid = VALIDATION_STRATEGIES.every((strategy) => strategy(text));
   if (!isValid) {
     throw new EmptyTextError();
   }
 };
