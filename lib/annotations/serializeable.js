export default ({ serializer, deserializer }) => {
  return (target) => {

    Object.defineProperty(target.prototype, 'toJSON', {
      get () {

        return () => {
          return serializer(this);
        };

      }
    });

    Object.defineProperty(target.prototype, 'fromJSON', {
      get (){

        return (json) => {
          Object.assign(this, deserializer(json));
        };

      }
    });

  };
};
