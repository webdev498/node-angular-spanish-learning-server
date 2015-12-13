import { capitalize, pluralize } from '../utilities/Strings';

export default (...Ctors) => {
  return (target) => {

    Ctors.forEach((Ctor) => {

      let property, Class;

      if(typeof Ctor === 'function'){
        property = Ctor.name.toLowerCase();
        Class = Ctor;
      } else {
        property = Object.keys(Ctor)[0];
        Class = Ctor[property];
      }

      // Add one
      Object.defineProperty(target.prototype, `add${capitalize(property)}`, {
        get () {

          return (item) => {

            item = item instanceof Class ? item : new Class(item);

            if(Array.isArray(this[property])){
              this[pluralize(property)].push(item);
            } else {
              this[pluralize(property)] = [item];
            }

          };

        }
      });

      // Add Many
      Object.defineProperty(target.prototype, `add${capitalize(pluralize(property))}`, {
        get () {

          return (...collection) => {

            collection = collection.map((item) => item instanceof Class ? item : new Class(item));

            if(Array.isArray(this[pluralize(property)])){
              this[pluralize(property)].push.apply(this[pluralize(property)], collection);
            } else {
              this[pluralize(property)] = collection;
            }

          };

        }
      });

      // Remove One

      Object.defineProperty(target.prototype, `remove${capitalize(property)}`, {
        get (){

          return (item) => {
            let index = this[pluralize(property)].indexOf(item);

            if(index < 0) {
              return false;
            } else {
              this[pluralize(property)].splice(index, 1);
              return true;
            }

          };

        }
      });

      // Remove Many

      Object.defineProperty(target.prototype, `remove${capitalize(pluralize(property))}`, {
        get (){
          return (...items) => {
            let removeFn = this[`remove${capitalize(property)}`];
            return items.map(removeFn).every((result) => !!result);

          };

        }
      });

      Object.defineProperty(target.prototype, `removeAll${capitalize(pluralize(property))}`, {

        get () {
          return () => {
            this[pluralize(property)] = [];
          };

        }

      });

    });
  };
};
