import { stub, spy } from 'sinon';
import TelephoneService from '../TelephoneService';
import UserService from '../UserService';
import MissingRecordError from 'exceptions/runtime/MissingRecordError';

describe('Telephone service', () => {
  describe('when updating a Telephone', () => {
    const request = {
      params: {
        userId: '19023',
        telephoneId: '29039d'
      },
      payload: {
        areaCode: 212,
        number: 902932093
      }
    };

    describe('and the record exists', () => {
      const userService = new UserService();
      const service = new TelephoneService(userService);
      const telephone = { save: spy() };
      const user = { related: () => user, get: () => telephone };

      before(async () => {
        stub(userService, 'get').returns(user);
        await service.update(request);
      });

      it('saves the changes to the record', () => {
        expect(telephone.save).to.have.been.calledWith(request.payload);
      });
    });

    describe('and the record does not exist', () => {
      const userService = new UserService();
      const service = new TelephoneService(userService);
      const user = { related: () => user, get: () => null };

      before(() => {
        stub(userService, 'get').returns(user);
      });

      it('throws an error', async () => {
        try {
          await service.update(request);
        } catch (err) {
          expect(err).to.be.instanceof(MissingRecordError);
        }
      });
    });
  });
});
