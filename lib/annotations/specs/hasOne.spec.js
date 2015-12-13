import hasOne from './../hasOne';
import { expect } from 'chai';


describe('hasOne', () => {
  let subject;

  describe('signature that accepts an object', () => {

    beforeEach(() => {
      class Engine {}

      @hasOne({motor: Engine})
      class Car{}
      subject = new Car();
    });

    it('adds an add method for the property', () => {
      expect(subject.addMotor).to.be.a('function');
    });
    it('adds a remove method for the property', () => {
      expect(subject.removeMotor).to.be.a('function');
    });
  });

  describe('signature that accepts a function', () => {
    beforeEach(() => {
      class Engine {}

      @hasOne(Engine)
      class Car{}
      subject = new Car();
    });

    it('adds an add method for the property', () => {
      expect(subject.addEngine).to.be.a('function');
    });
    it('adds a remove method for the property', () => {
      expect(subject.removeEngine).to.be.a('function');
    });

  })

});
