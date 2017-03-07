import TerminologyService from '../../service/TerminologyService';
import TerminologyController from '../TerminologyController';
import { NO_CONTENT } from 'http/status-codes';
import { mock, stub, spy } from 'sinon';
import { expect } from 'chai';

describe('Terminology Controller', () => {

  describe('excluding terms from being associated with one another', () => {

    describe('when the source term\'s ID and language\'s ID are in the request parameters', () => {
      const request = {
        payload: {
          targets: [{}, {}, {}]
        },
        params: {
          languageId: '3242d0b4-3319-4bce-9254-0cad750dfc7e',
          sourceId: 'e1e9f73b-c12e-4a73-bffe-f3731c7b777d'
        }
      };
      describe('when the association was successful', () => {
        const response = {};
        const reply = stub().returns(response);
        const service = new TerminologyService();
        const serviceMock = mock(service);
        const controller = new TerminologyController(service);

        before(async () => {
          serviceMock.expects('exclude')
          .once()
          .withArgs(request.params.sourceId, request.params.languageId, request.payload.targets)
          .returns(Promise.resolve());

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
        const service = new TerminologyService();
        const serviceMock = mock(service);
        const reply = spy();
        const controller = new TerminologyController(service);

        before(() => {
          serviceMock.expects('exclude').once().withArgs(request.params.sourceId, request.params.languageId, request.payload.targets).returns(Promise.reject(new Error()));
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

    describe('when the source term and the language are in the payload', () => {
      const request = {
        params: {},
        payload: {
          languageId: '739db6ee-c1e4-4ade-af1d-e0bfba8569c1',
          source: {id: 'e1e9f73b-c12e-4a73-bffe-f3731c7b777d'},
          targets: [{}, {}, {}]
        }
      };

      describe('when the association was successful', () => {
        const response = {};
        const reply = stub().returns(response);
        const service = new TerminologyService();
        const serviceMock = mock(service);
        const controller = new TerminologyController(service);

        before(async () => {
          serviceMock.expects('exclude')
          .once()
          .withArgs(request.payload.source.id, request.payload.languageId, request.payload.targets)
          .returns(Promise.resolve());

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
        const service = new TerminologyService();
        const serviceMock = mock(service);
        const reply = spy();
        const controller = new TerminologyController(service);

        beforeEach(() => {
          serviceMock.expects('exclude').once().returns(Promise.reject(new Error()));
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
});
