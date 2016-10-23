import TerminologyService from '../../service/TerminologyService';
import TerminologyController from '../TerminologyController';
import { NO_CONTENT } from 'http/status-codes';
import { mock, stub, spy } from 'sinon';
import { expect } from 'chai';

const request = {
  payload: {
    languageId: '739db6ee-c1e4-4ade-af1d-e0bfba8569c1',
    source: {},
    targets: [{}, {}, {}]
  },
  query: {
    languageId: '739db6ee-c1e4-4ade-af1d-e0bfba8569c1'
  }
};

describe('Terminology Controller', () => {
  let controller;
  const service = new TerminologyService();
  const serviceMock = mock(service);

  describe('excluding terms from being associated with one another', () => {
    describe('when the association was successful', () => {
      const response = {};
      const reply = stub().returns(response);
      const service = new TerminologyService();
      const serviceMock = mock(service);
      serviceMock.expects('exclude').once().withArgs(request.payload).returns(Promise.resolve());

      before(async () => {
        const controller = new TerminologyController(service);
        await controller.exclude(request, reply);
      });

      after(() => serviceMock.verify());

      it('replies to the user', () => {
        expect(reply).to.have.been.called;
      });

      it('sets the status code to NO CONTENT', () => {
        expect(response.statusCode).to.equal(NO_CONTENT);
      });
    });

    describe('when the association was unsuccessful', () => {
      const reply = spy();
      serviceMock.expects('exclude').once().withArgs(request.payload).returns(Promise.reject(new Error()));

      before(() => {
        controller = new TerminologyController(service);
      });

      after(() => serviceMock.verify());

      it('raises an exception', async () => {
        try {
          await controller.exclude(request, reply);
        } catch(error) {
          expect(error).to.not.equal(undefined);
        }
      });
    });
  });
});
