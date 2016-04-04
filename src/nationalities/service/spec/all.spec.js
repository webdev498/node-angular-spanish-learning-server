import { expect } from 'chai';
import { stub } from 'sinon';
import Nationality from './../../models/Nationality';
import * as NationalityService from './../';
import * as LoggingService from './../../../logging';

describe('Users service FetchAll', () => {
  let nationalitiesDouble = {},
    nationalities = [];

  beforeEach(() => {
    nationalitiesDouble = {};

    stub(LoggingService, 'logInfo');
    stub(LoggingService, 'logError');
    stub(Nationality, 'forge').returns(nationalitiesDouble);

  });

  afterEach(() => {
    Nationality.forge.restore();
    LoggingService.logError.restore();
    LoggingService.logInfo.restore();
  });

  describe('when there are records in the database', () => {
    beforeEach(() => {
      nationalitiesDouble.fetchAll = stub().returns(Promise.resolve(nationalities));
    });

    it('fetching all nationalities', () => NationalityService.all().then(result => expect(result).to.equal(nationalities)));
  });

  describe('when there is a database error', () => {
    let error = new Error();

    beforeEach(() => {
      nationalitiesDouble.fetchAll = stub().returns(Promise.reject(error));
    });
    it('fetching all nationalities error', () => NationalityService.all().catch(errorResult => expect(errorResult).to.equal(error)));
  });
});
