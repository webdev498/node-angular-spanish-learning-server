'use strict';
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
const expect = chai.expect;

const Application = require('../application');
const express = require('express');

describe('An Application', () => {

  describe('when instantiated', () => {
    describe('and supplied a server implementation', () => {
      let subject, serverDouble = {};

      beforeEach(() => {
        subject = new Application(serverDouble);
      });

      it('uses that implementation', () => {
        expect(subject.server).to.eq(serverDouble);
      });

    });

    describe('and a server implementation is not provided', () => {
      let subject;

      beforeEach(() => {
        subject = new Application();
      });

      it('uses a default implementation', () => {
        expect(subject.server).to.not.be.null
      });

    });
  });

  describe('registering a new route', () => {
    let subject;

    beforeEach(() => {
      subject = new Application();
    });

    describe('when passing a function', () => {
      it('invokes that function passing its server implementation as the argument', () => {
        let routeHandler = sinon.spy();
        subject.register(routeHandler);
        expect(routeHandler).to.have.been.calledWith(subject.server);
      });
    });

    describe('when pass a non-callable object', () => {
      it('raises an exception', () => {
        expect(() => {subject.register("Can't invoke this")}).to.throw();
      });
    });
  });

  describe('when initializing middleware', () => {
    let subject;

    beforeEach(() => {
      subject = new Application();
    });

    describe('when passing a function', () => {
      it('invokes that function passing its server implementation as the argument', () => {
        let middleware = sinon.spy();
        subject.initialize(middleware);
        expect(middleware).to.have.been.calledWith(subject.server);
      });
    });

    describe('when pass a non-callable object', () => {
      it('raises an exception', () => {
        expect(() => {subject.initialize("Can't invoke this")}).to.throw();
      });
    });

  });

  describe('when binding to a TCP port', () => {
    let subject,
        mock,
        stub,
        server = express();

    beforeEach(() => {
      mock = sinon.mock(server);
      subject = new Application(server);
    });

    afterEach(() => {
      mock.restore();
    });

    it('delgates to the listen method on its server collaborator', () => {
      mock.expects('listen').once()
      subject.bind(2000)
      mock.verify();
    });

  });
});
