export const toSnakeCase = (str) => {
  return str.replace(/\.?([A-Z]+)/g, (x, y) => `_${y.toLowerCase()}`)
    .replace(/^_/, '');
};

export const toPascalCase = (str) => {
  let array = str.split('_').filter((item) => !!item);
  let first = array.shift();

  return first + array.map((segment) => segment.charAt(0).toUpperCase() + segment.substr(1).toLowerCase()).join('');

};
