import { expect } from 'chai';
import { stub, spy } from 'sinon';
import Choice from './../../models/Choice';
import * as LoggingService from './../../../logging';
import * as ChoicesService from './../';

describe('Choices service', () => {
  let loggerDouble = {};
  beforeEach(() => {
    stub(LoggingService, 'logger').returns(loggerDouble);
  });

  afterEach(() => {
    LoggingService.logger.restore();
  });

  describe('fetching existing choices', () => {
    describe('when there choices in the database', () => {
      let choices = [{id: 1}, {id: 2}, {id: 3}];

      beforeEach(() => {
        loggerDouble.info = spy();
        stub(Choice, 'fetchAll').returns(Promise.resolve(choices));
      });

      afterEach(() => {
        Choice.fetchAll.restore();
      });

      it('resolves the promise with those records', (done) => {
        ChoicesService.all().then((results) => {
          expect(results).to.eq(choices);
          done();
        });
      });
    });

    describe('when there are no choices in the database', () => {
      let choices = [];

      beforeEach(() => {
        stub(Choice, 'fetchAll').returns(Promise.resolve(choices));
      });

      afterEach(() => {
        Choice.fetchAll.restore();
      });

      it('resolves an empty array', (done) => {
        ChoicesService.all().then((results) => {
          expect(results).to.eq(choices);
          done();
        }).catch(done);
      });
    });

    describe('when there was an error in the database driver', () => {
      let databaseError = new Error();


      beforeEach(() => {
        loggerDouble.error = spy();
        stub(Choice, 'fetchAll').returns(Promise.reject(databaseError));
      });

      afterEach(() => {
        Choice.fetchAll.restore();
      });

      it('rejects promise with a DatabaseOperation error', (done) => {
          ChoicesService.all().then(() => {}, (exception) => {
            expect(exception).to.eq(databaseError);
            done();
          });
      });
    });

  });
});
