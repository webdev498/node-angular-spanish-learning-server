
/**
 * compose - Returns the composition of a list of functions, where each function
 * consumes the return value of the function that follows. In math terms,
 * composing the functions f(), g(), and h() produces f(g(h()).
 *
 * @param {array} funcs arbitrary list of functions
 *
 * @return {type} Description
 */
export function compose(...funcs) {
  return (...input) => {
    return funcs.reduce((result, func) => {
      return func(...result);
    }, input);
  };
}
