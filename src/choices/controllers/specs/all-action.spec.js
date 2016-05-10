import { expect } from 'chai';
import { stub, spy } from 'sinon';
import * as ChoiceService from './../../service';
import * as Controller from './../';

describe('fetching choices', () => {
  let request = {},
      response = {},
      reply;


  it('calls all on the choice service', (done) => {
    request.params = {};
    reply = spy();
    stub(ChoiceService, 'all').returns(Promise.resolve());

    Controller.list(request, reply).then(() => {
      expect(ChoiceService.all).to.have.been.called;
      ChoiceService.all.restore();
      done();
    });

  });

  describe('when the fetch was successful', () => {
    let choices = [{name: 'foo'}];

    before(() => {
      reply = spy();
      stub(ChoiceService, 'all').returns(Promise.resolve(choices));
    });

    after(() => {
      ChoiceService.all.restore();
    });

    it('replies with the choices fetched from the database', (done) => {
      Controller.list(request, reply).then(() => {
        expect(reply).to.have.been.calledWith(choices);
        done();
      });
    });

  });

  describe('when the update was not sucessful', () => {
    let error = new Error();
    let statusCode = 404;

    beforeEach(() => {
      error.statusCode = statusCode;
      response = { notice: 'I am a thing'};
      reply = stub().returns(response);
      stub(ChoiceService, 'all').returns(Promise.reject(error));
    });

    afterEach(() => {
      ChoiceService.all.restore();
    });


    it('replies with the error rejected from the promise', (done) => {
      Controller.list(request, reply).then(() => {
        expect(reply).to.have.been.calledWith(error);
        done();
      });
    });

    it('sets the status code of the response to the status code property of the error', (done) => {
      Controller.list(request, reply).then(() => {
        expect(response.statusCode).to.eq(statusCode);
        done();
      });
    });

  });

});
