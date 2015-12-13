'use strict';

import { capitalize } from '../utilities/Strings';

// ({car: Automobile})
// (Automobile)
export default (...args) => {
  return (target) => {

    args.forEach((arg) => {

      let property, Constructor;

      if(typeof arg === 'object'){
        property = Object.keys(arg)[0];
        Constructor = arg[property];
      } else {
        property = arg.name.toLowerCase();
        Constructor = arg;
      }

      // Constructor override, Add, Remove

      const { constructor }  = target.prototype;

      Object.defineProperty(target.prototype, `add${capitalize(property)}`, {
        get () {

          return (newValue) => {
            this[property] = newValue instanceof Constructor ? newValue : Constructor.call(newValue);
          }.bind(this);

        }
      });

      Object.defineProperty(target.prototype, `remove${capitalize(property)}`, {
        get () {

          return () => {
            this[property] = null;
          }.bind(this);

        }
      });

    });
  };
};
