import { stub } from 'sinon';
import { CREATED } from 'http/status-codes';
import ExaminationService from '../../services/ExaminationService';
import ExaminationsController from '../ExaminationsController';

describe('ExaminationsController', () => {
  const request = {query:{}, params:{}};

  describe('creating examindations', () => {
    describe('when the creation was successful', () => {
      const service = new ExaminationService();
      const controller = new ExaminationsController(service);
      const exam = {};
      const response = {};
      const reply = stub().returns(response);

      before(async () => {
        stub(service, 'create').returns(Promise.resolve(exam));
        await controller.create(request, reply);
      });

      it('replies with the newly created exam model', () => {
        expect(reply).to.have.been.calledWith(exam);
      });

      it('sets the status code of the reply to created', () => {
        expect(response.statusCode).to.equal(CREATED);
      });
    });
  });

  describe('when the creation was successful', () => {
    const response = {};
    const error = new Error();
    const service = new ExaminationService();
    const controller = new ExaminationsController(service);
    const reply = stub().returns(response);

    before(async () => {
      stub(service, 'create').returns(Promise.reject(error));
      await controller.create(request, reply);
    });

    it('replies with the error generated by the service', () => {
      expect(reply).to.have.been.calledWith(error);
    });
  });
});
