import { expect } from 'chai';
import { stub } from 'sinon';
import Choice from './../../models/Choice';
import * as LoggingService from './../../../logging';
import * as ChoicesService from './../';

describe('Choices service', () => {
  describe('creating a new choice', () => {
    let choiceModelDouble = {};
    let text = 'Queen Elizabeth II';
    let saveMock;

    beforeEach(() => {
      choiceModelDouble = { save: () => {} };
      stub(LoggingService, 'logInfo');
      stub(LoggingService, 'logError');

      stub(Choice, 'forge').returns(choiceModelDouble);
      saveMock = stub(choiceModelDouble, 'save').returns(Promise.resolve());

    });

    afterEach(() => {
      Choice.forge.restore();
      LoggingService.logInfo.restore();
      LoggingService.logError.restore();
    });

    it('logs information to the logger', (done) => {
      ChoicesService.create({ text })
        .then(() => {
          expect(LoggingService.logInfo).to.have.been.called;
          done();
        });
    });

    it('delegates to the #forge method on the Choice model', (done) => {
      ChoicesService.create({ text }).then(() => done());
      expect(Choice.forge).to.have.been.called;
    });

    it('attempts to save the model', (done) => {
      ChoicesService.create({ text })
        .then(() => {
          expect(choiceModelDouble.save).to.have.been.called;
          done();
        });
    });

    describe('whent he save is successful', () => {
      let saveResult = {};
      beforeEach(() => {
        saveMock.returns(Promise.resolve(saveResult));
      });

      it('resolves the choice', (done) => {
        ChoicesService.create({ text })
          .then((result) => {
            expect(result).to.equal(saveResult);
            done();
          });
      });
    });

    describe('when the save was unsuccessful', () => {
      let error = {};
      beforeEach(() => {
        saveMock.returns(Promise.reject(error));
      });

      it('logs an error', (done) => {
        ChoicesService.create({ text })
          .then(() => {}, () => {
            expect(LoggingService.logError).to.have.been.called;
            done();
          });
      });

      it('rejects an error', (done) => {
        ChoicesService.create({ text })
          .then(() => {}, (saveError) => {
            expect(saveError).to.equal(error);
            done();
          });
      });
    });

  });
});
