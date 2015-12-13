export default (validations) => {
  return (target) => {
    Object.defineProperty(target.prototype, 'isValid', {
      get (){
        return () => {
          return validations.every((validation) => validation(this) === true);
        };
      }
    });
  };
};
