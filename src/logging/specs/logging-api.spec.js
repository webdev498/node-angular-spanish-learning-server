import * as logger from './../';
import bucker from 'bucker';
import { spy, stub } from 'sinon';
import { expect } from 'chai';

const { logTrace, logInfo, logWarning, logError } = logger;

describe('logging API', () => {
  let loggerSingleton;
  let serverDouble = { on: stub() };
  let next = spy();

  before(() => {
    loggerSingleton = ['debug', 'info', 'warn', 'error'].reduce((singleton, level) => { singleton[level] = spy(); return singleton; }, {});
    stub(bucker, 'createLogger').returns(loggerSingleton);
    logger.register(serverDouble, null, next);
  });

  after(() => {
    bucker.createLogger.restore();
  });

  describe('#logError', () => {
    let message = 'logging an errror';

    before(() => {
      logError(message);
    });

    it('delegates to the "error" method on the logger singleton', () => {
      expect(loggerSingleton.error).to.have.been.calledWith(message);
    });
  });

  describe('#logWarning', () => {
    let message = 'logging an warning';

    before(() => {
      logWarning(message);
    });

    it('delegates to the "warn" method on the logger singleton', () => {
      expect(loggerSingleton.warn).to.have.been.calledWith(message);
    });
  });

  describe('#logInfo', () => {
    let message = 'logging info';

    before(() => {
      logInfo(message);
    });

    it('delegates to the "info" method on the logger singleton', () => {
      expect(loggerSingleton.info).to.have.been.calledWith(message);
    });
  });

  describe('#logTrace', () => {
    let message = 'logging debugging information';

    before(() => {
      logTrace(message);
    });

    it('delegates to the "debug" method on the logger singleton', () => {
      expect(loggerSingleton.debug).to.have.been.calledWith(message);
    });
  });

});
