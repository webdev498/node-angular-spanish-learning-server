import validateable from './../validateable';
import { expect } from 'chai';

const VALIDATIONS = [
  (subject) => typeof subject.name === 'string', // has a name
  (subject) => subject.tracks.length > 0, // It has at least one track
  (subject) => typeof subject.recordedDate === 'object' && subject.recordedDate.getTime() < new Date().getTime() // The recorded Date for the album is in the past
];


@validateable(VALIDATIONS)
class Album {
  constructor(name, ...tracks) {
    this.name = name;
    this.tracks = tracks;
  }
}

describe('validateable', () => {
  it('adds a "isValid" method to the decorated class', () => {
    let album = new Album('Apetite for Distruction', 'Welcome to the Jungle');
    expect(album).to.have.property('isValid').that.is.a('function');
  });

  describe('when the model is valid', () => {
    let album;

    before(() => {
      album = new Album('User your Illusion', 'November Rain');
      album.recordedDate = new Date('September 17, 1991');
    });

    it('returns true when "isValid" is called', () => {
      expect(album.isValid()).to.be.true;
    });

  });

  describe('when the model is not valid', () => {
    let album;

    before(() => {
      album = new Album('User your Illusion', 'November Rain');
    });

    it('returns false when "isValid" is called', () => {
      expect(album.isValid()).to.be.false;
    });

  });
});
