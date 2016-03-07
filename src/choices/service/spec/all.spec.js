import { expect } from 'chai';
import { stub } from 'sinon';
import Choice from './../../models/Choice';
import * as LoggingService from './../../../logging';
import * as ChoicesService from './../';

describe('Choices service', () => {

  beforeEach(() => {
    stub(LoggingService, 'logInfo');
    stub(LoggingService, 'logError');
  });

  afterEach(() => {
    LoggingService.logInfo.restore();
    LoggingService.logError.restore();
  });

  describe('fetching existing choices', () => {
    let fetchStub;
    describe('when there choices in the database', () => {
      let choices = [{id: 1}, {id: 2}, {id: 3}];

      beforeEach(() => {
        fetchStub = stub(Choice, 'fetchAll').returns(Promise.resolve(choices));
      });

      it('resolves the promise with those records', done => {
        ChoicesService.all().then(results => {
          expect(results).to.eq(choices);
          done();
        });
      });
    });

    describe('when there are no choices in the database', () => {
      let choices = [];

      beforeEach(() => {
        fetchStub.returns(Promise.resolve(choices));
      });

      it('resolves an empty array', done => {
        ChoicesService.all().then(results => {
          expect(results).to.eq(choices);
          done();
        }).catch(done);
      });
    });

    describe('when there was an error in the database driver', () => {
      let databaseError = new Error();


      beforeEach(() => {
        fetchStub.returns(Promise.reject(databaseError));
      });

      it('rejects promise with a DatabaseOperation error', done => {
          ChoicesService.all().then(() => {}, exception => {
            expect(exception).to.eq(databaseError);
            done();
          });
      });
    });

  });
});
