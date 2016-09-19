import LanguagesController from '../LanguagesController';
import LanguageService from '../../service/LanguageService';
import { stub, spy } from 'sinon';
import { expect } from 'chai';

describe('LanguagesController', () => {
  const request = {};
  const error = new Error();
  const results = [{}, {}, {}];

  describe('when listing all languages', () => {
    describe('and the query is successful', () => {
      const reply = spy();
      const service = new LanguageService();
      stub(service, 'all').returns(Promise.resolve(results));
      const controller = new LanguagesController(service);

      before(async () => {
        await controller.list(request, reply);
      });

      it('returns a collection of supported languages', () => {
        expect(reply).to.have.been.calledWith(results);
      });
    });

    describe('and the query resulted in an error', () => {
      const reply = spy();
      const service = new LanguageService();
      stub(service, 'all').returns(Promise.reject(error));
      const controller = new LanguagesController(service);
      before(async () => {
        await controller.list(request, reply);
      });

      it('returns an error object',() => {
        expect(reply).to.have.been.calledWith(error);
      });
    });
  });
});
