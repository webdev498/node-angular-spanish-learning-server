const VALIDATION_STRATEGIES = [
  (selected) => typeof selected === 'boolean'
];

export default ({ attributes }) => {
  let isValid = VALIDATION_STRATEGIES.every((strategy) => strategy(attributes.phase));
  if (!isValid) {
    throw new TypeError('Selected must be a boolean value');
  }
};
