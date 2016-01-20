import { expect } from 'chai';
import { stub, spy } from 'sinon';
import Choice from './../../models/Choice';
import * as LoggingService from './../../../logging';
import * as ChoicesService from './../';

describe('Choices service', () => {
  describe('creating a new choice', () => {
    let loggerDouble = {};
    let choiceModelDouble = {};
    let text = 'Queen Elizabeth II';
    let saveMock;

    beforeEach(() => {
      choiceModelDouble = { save: () => {} };
      loggerDouble.info = spy();


      stub(LoggingService, 'logger').returns(loggerDouble);
      stub(Choice, 'forge').returns(choiceModelDouble);
      saveMock = stub(choiceModelDouble, 'save').returns(Promise.resolve());

    });

    afterEach(() => {
      Choice.forge.restore();
      LoggingService.logger.restore();
    });

    it('logs information to the logger', (done) => {
      ChoicesService.create({ text })
        .then(() => {
          expect(loggerDouble.info).to.have.been.called;
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
        loggerDouble.error = spy();
      });

      it('logs an error', (done) => {
        ChoicesService.create({ text })
          .then(() => {}, () => {
            expect(loggerDouble.error).to.have.been.called;
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
