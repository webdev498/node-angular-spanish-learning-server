import { PasswordComplexityError } from '../exceptions';

/*
  Register multiple stratigies for determining password complexity.
  Examples could include:
  - Length requirement
  - Special character count
  - Upper and Lower
  - etc.
*/
const COMPLEXITY_STRATEGIES = [
  (password) => password.length > 1 //TODO: Driven by external configuration
];

export default ({ password }) => {
  let isValid = COMPLEXITY_STRATEGIES.every((strategy) => strategy(password));
  if (!isValid) {
    throw new PasswordComplexityError();
  }
};
