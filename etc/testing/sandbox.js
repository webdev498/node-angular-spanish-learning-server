'use strict';

const sinon = require('sinon');
let sandbox;

beforeEach(function() {
  const config = Object.assign({
    injectInto: this,
    useFakeTimers: false,
    useFakeServer: false
  }, sinon.getConfig(sinon.config));
  sandbox = this.__sandbox__ = sinon.sandbox.create(config);
});

afterEach(function() {
  sandbox.verifyAndRestore();
  sandbox = null;
});

function stub() {
  if (arguments.length === 0) {
    return sinon.stub();
  }
  if (!sandbox) {
    throw new TypeError('Cannot call stub function of sinonSandbox outside of an individual test');
  }
  return sandbox.stub.apply(sandbox, arguments);
}

function spy() {
  if (arguments.length === 0) {
    return sinon.spy();
  } else if (arguments.length === 1 && typeof arguments[0] === 'function') {
    return sinon.spy.call(sinon.spy, arguments[0]);
  }
  if (!sandbox) {
    throw new TypeError('Cannot call stub function of sinonSandbox outside of an individual test');
  }
  return sandbox.spy.apply(sinon.spy, arguments);
}

function findSpyCallByFirstParam(spyFn, param) {
  if (!spyFn || !spyFn.isSinonProxy) {
    throw new TypeError("You must pass a sinon spy function into findSpyCallByFirstParam. Received " + spyFn);
  }
  return spyFn.args.find((fnCall) => fnCall[0] === param);
}


module.exports = {
  findSpyCallByFirstParam,
  spy,
  stub
};
