import bucker from 'bucker';
import * as logging from '../';
import EventEmitter from 'events';

import { expect } from 'chai';
import { stub, spy } from 'sinon';

let server, request, logger;

const id = 123;
const info = { remoteAddress: 'http://localhost' };
const method = 'post';
const paramsArray = [];
const payload = {};
const path = '/path/to/handler';
const next = spy();


describe('logging middleware', () => {
  request = {
    id,
    info,
    method,
    paramsArray,
    payload,
    path
  };

  describe('#decorate', () => {

    before(() => {
      server = new EventEmitter();
      stub(server, 'on');
      logging.register(server, {}, next);
    });


    it('subscribes to "response" events', () => {
      expect(server.on).to.have.been.calledWith('response');
    });

    it('subscribes to "request-error" events', () => {
      expect(server.on).to.have.been.calledWith('request-error');
    });

    it('subscribes to "start" events', () => {
      expect(server.on).to.have.been.calledWith('start');
    });

    it('subscribes to "route" events', () => {
      expect(server.on).to.have.been.calledWith('start');
    });

  });


  describe('server eventing', () => {

    before((() => {
      logger = { info: spy(), error: spy() };
      stub(bucker, 'createLogger').returns(logger);
      server = new EventEmitter();
      server.info = {uri: 'http://localhost:8000'};
      logging.register(server, {}, next);
    }));

    describe('when response is emitted', () => {
      beforeEach(() => {
        server.emit('response', request);
      });

      it('logs at the info level', () => {
        expect(logger.info).to.have.been.called;
      });
    });

    describe('when request-error is emitted', () => {
      beforeEach(() => {
        server.emit('request-error', request, new Error());
      });

      it('logs at the error level', () => {
        expect(logger.error).to.have.been.called;
      });
    });

    describe('when start is emitted', () => {
      beforeEach(() => {
        server.emit('start', request);
      });

      it('logs at the info level', () => {
        expect(logger.info).to.have.been.called;
      });
    });

    describe('when route is emitted', () => {
      beforeEach(() => {
        server.emit('route', request);
      });

      it('logs at the info level', () => {
        expect(logger.info).to.have.been.called;
      });
    });

    after(() => {
      bucker.createLogger.restore();
    });

  });

});
