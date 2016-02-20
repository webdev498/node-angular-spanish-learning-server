 const VALIDATION_STRATEGIES = [
   ({text}) => typeof text === 'string',
   ({text}) => text.length > 0
 ];

 export default ({ attributes }) => {
   let isValid = VALIDATION_STRATEGIES.every((strategy) => strategy(attributes));
   if (!isValid) {
     throw new TypeError("text must be a string with a length greater than zero");
   }
 };
