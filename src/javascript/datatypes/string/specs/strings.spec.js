import { toPascalCase, toSnakeCase } from './../';
import { expect } from 'chai';

describe('String extensions', () => {

  describe('#toPascalCase', () => {
    it('converts from snake case to pascal case', () => {
      expect(toPascalCase('_my_name_is_earl_')).to.equal('myNameIsEarl');
    });
  });

  describe('#toSnakeCase', () => {
    it('converts from pascal case to snake case', () => {
      expect(toSnakeCase('helloWorld')).to.equal('hello_world');
    });
  });
});
