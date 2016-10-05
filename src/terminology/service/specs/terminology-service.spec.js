import TerminologyService from '../TerminologyService';
import TermExclusion from '../../models/TermExclusion';
import Term from '../../models/Term';
import { stub, spy } from 'testing/sandbox';
import { expect } from 'chai';

describe('Terminology service', () => {
  const service = new TerminologyService();

  const exclusion = {
    language: {id: 123},
    source: {
      id: 190293
    },
    targets: [
      {
        id: 123
      },
      {
        id: 456
      },
      {
        id: 789
      }
    ]
  };

  describe('when excluding terms', () => {
    let stubs;

    beforeEach(async() => {
      stubs = [];

      stub(TermExclusion, 'forge', () => {
        const s = {
          save: stub()
        };
        stubs.push(s);
        return s;
      });

      await service.exclude(exclusion);
    });

    it('creates TermExclusion model for each association that is excluded', () => {
      expect(exclusion.targets.length).to.equal(stubs.length);
    });

    it('saves each model to create a record in the database', () => {
      expect(stubs.every((stub) => expect(stub.save).to.have.been.called));
    });

  });

  describe('when fetching a list of terms', () => {

    describe('when a language name is provided', () => {
      const query = { where: spy(), innerJoin: spy() };
      const languageName = 'Spanish';
      beforeEach(() => {
        stub(Term, 'query').yields(query);
        service.list({ languageName });
      });

      it('fetches all of the terms for that language', () => {
        expect(query.where).to.have.been.calledWith('languages.name', '=', languageName);
      });
    });

    describe('when no language name is provided', () => {
      const term = { fetchAll: spy(), orderBy: () => term };

      beforeEach(async () => {
        stub(Term, 'forge').returns(term);
        await service.list({});
      });
      it('fetches all terms', () => {
        expect(term.fetchAll).to.have.been.called;
      });
    });
  });
});
