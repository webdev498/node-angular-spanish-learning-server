import sinon from 'sinon';

let sandbox;

beforeEach(function() {
  const config = {
    ...sinon.getConfig(sinon.config),
    injectInto: this,
    useFakeTimers: false,
    useFakeServer: false
  };
  sandbox = this.__sandbox__ = sinon.sandbox.create(config);
});

afterEach(function() {
  sandbox.verifyAndRestore();
  sandbox = null;
});

export function stub(...args) {
  if (args.length === 0) {
    return sinon.stub();
  }
  if (!sandbox) {
    throw new TypeError('Cannot call stub function of sinonSandbox outside of an individual test');
  }
  return sandbox.stub(...args);
}

export function spy(...args) {
  if (args.length === 0) {
    return sinon.spy();
  } else if (args.length === 1 && typeof args[0] === 'function') {
    return sinon.spy(args[0]);
  }
  if (!sandbox) {
    throw new TypeError('Cannot call stub function of sinonSandbox outside of an individual test');
  }
  return sandbox.spy(...args);
}

export function findSpyCallByFirstParam(spyFn, param) {
  if (!spyFn || !spyFn.isSinonProxy) {
    throw new TypeError("You must pass a sinon spy function into findSpyCallByFirstParam. Received " + spyFn);
  }
  return spyFn.args.find((fnCall) => fnCall[0] === param);
}
