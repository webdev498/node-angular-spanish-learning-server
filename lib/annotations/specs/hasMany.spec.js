import hasMany from './../hasMany';
import { expect } from 'chai';


class Nail{}

@hasMany({fastener: Nail})
class Bucket{
  constructor() {
    this.fasteners = [];
  }
}

@hasMany(Nail)
class Pail{
  constructor() {
    this.nails = [];
  }
}

describe('hasMany', () => {
  let subject;

  describe('with the object signature', () => {

    beforeEach(() => {
      subject = new Bucket();
    });

    describe('addFastener', () => {
      let initialCount;
      beforeEach(() => {
        initialCount = subject.fasteners.length;
      });

      it('added to the subject', () => {
        expect(subject.addFastener).to.be.a('function');
      });

      it('adds one fastener to the subject', () => {
        subject.addFastener('Cement');
        expect(subject.fasteners.length).to.equal(1 + initialCount);
      });

    });

    describe('addFasteners', () => {
      let initialCount;

      beforeEach(() => {
        initialCount = subject.fasteners.length;
      });

      it('added to the subject', () => {
        expect(subject.addFasteners).to.be.a('function');
      });

      it('adds many fastener to the subject', () => {
        subject.addFasteners('Cement', 'Ceramic', 'Wood');
        expect(subject.fasteners.length).to.equal(3 + initialCount);
      });

    });

    describe('removeFastener', () => {
      let initialCount;

      beforeEach(() => {
        subject.addFasteners('Foo', 'Biz', 'Bar', 'Boop');
        initialCount = subject.fasteners.length;
      });

      it('added to the subject ', () => {
        expect(subject.removeFastener).to.be.a('function');
      });

      it('removes a single fastener', () => {
        let target = subject.fasteners[0];
        subject.removeFastener(target);
        expect(subject.fasteners.length).to.equal(initialCount - 1);
      });

    });

    describe('removeFasteners', () => {
      let initialCount;

      beforeEach(() => {
        subject.addFasteners('Foo', 'Biz', 'Bar', 'Bat');
        initialCount = subject.fasteners.length;
      });

      it('removes a single fastener', () => {
        expect(subject.removeFastener).to.be.a('function');
      });

      it('removes many fasters from the subject', () => {
        let targets = subject.fasteners.slice(0, subject.fasteners.length -1 );
        subject.removeFasteners.apply(subject, targets);
        expect(subject.fasteners.length).to.equal(initialCount - targets.length);
      });

    });

  });

  describe('with the function signature', () => {
    beforeEach(() => {
      subject = new Pail();
    });

    it('adds an \'addNails` method', () => {
      expect(subject.addNails).to.be.a('function');
    });

    it('adds an \'addNail` method', () => {
      expect(subject.addNail).to.be.a('function');
    });

    it('adds a \'removeNail` method', () => {
      expect(subject.removeNail).to.be.a('function');
    });

    it('adds a \'removeNails` method', () => {
      expect(subject.removeNails).to.be.a('function');
    });

  });
});
