import EmptyTextError from './../exceptions/EmptyTextError';

 const VALIDATION_STRATEGIES = [
   name => typeof name === 'string',
   name => name.length > 0
 ];

 export default ({ name }) => {
   let isValid = VALIDATION_STRATEGIES.every(strategy => strategy(name));
   if (!isValid) {
     throw new EmptyTextError();
   }
 };
