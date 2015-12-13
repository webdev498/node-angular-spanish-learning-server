import serializeable from './../serializeable';
import chai, { expect } from 'chai';
import { stub, spy } from 'sinon';
import sinonChai from 'sinon-chai'

chai.use(sinonChai);

let serializer = stub().returns({foo: "bar"});
let deserializer = spy();

@serializeable({ serializer, deserializer })
class Subject{
  constructor (json){
    this.fromJSON(json);
  }
}


describe('serializeable', () => {
  describe('when serializing to JSON', () => {

    let subject, result;
    before(() => {
      subject = new Subject();
      result = JSON.stringify(subject);
    });

    it('calls the serializer passed to the decorator', () => {
      expect(serializer).to.have.been.calledOnce;
    });

    it('passes the instance to the serializer', () => {
      expect(serializer).to.have.be.calledWith(subject);
    });

    it('returns the resulting value', () => {
      expect(result).to.eql('{"foo":"bar"}');
    })
  });

  describe('when deserializing from JSON', () => {
    let subject, json = {foo: 'bar'}
    before(() => {
      subject = new Subject(json);
    });

    it('defines a "fromJSON" method on the prototype', () => {
      expect(subject).to.have.property('fromJSON').and.be.a('function');
    });

    it('invokes the deserializer provided to the decorator with the data passed to the constructor', () => {
      expect(deserializer).to.have.been.calledWith(json);
    })

  });

});
