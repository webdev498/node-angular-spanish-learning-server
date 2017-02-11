import TerminologyService from 'terminology/service/TerminologyService';
import TermExclusion from 'terminology/models/TermExclusion';
import Term from 'terminology/models/Term';
import { stub, spy } from 'testing/sandbox';

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
          save: stub().returns(Promise.resolve())
        };
        stubs.push(s);
        return s;
      });

      await service.exclude(exclusion.source.id, exclusion.language.id, exclusion.targets);
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
      const query = { where: spy(), innerJoin: spy(), orderBy: spy() };
      const term = { fetchAll: spy() };
      const languageName = 'Spanish';
      beforeEach(() => {
        stub(Term, 'query').yields(query).returns(term);
        service.list({ languageName });
      });

      it('fetches all of the terms for that language', () => {
        expect(query.where).to.have.been.calledWith('languages.name', '=', languageName);
      });

      it('includes the term\'s corresponding categories', () => {
        expect(term.fetchAll).to.have.been.calledWith({ withRelated: ['language', 'categories'] });
      });
    });

    describe('when no language name is provided', () => {
      const term = { fetchAll: spy() };
      const collection = { orderBy: () => term };

      beforeEach(async () => {
        stub(Term, 'forge').returns(collection);
        await service.list({});
      });

      it('fetches all terms', () => {
        expect(term.fetchAll).to.have.been.called;
      });

      it('includes the term\'s corresponding categories', () => {
        expect(term.fetchAll).to.have.been.calledWith({ withRelated: ['language', 'categories'] });
      });
    });
  });

  describe('when finding a translation for a term', () => {
    let query, model;
    const termId = 123;
    beforeEach(() => {
      query = { join: spy(), where: spy(), limit: spy() };
      model = { fetchAll: spy() };
      stub(Term, 'query').yields(query).returns(model);
    });

    afterEach(() => { Term.query.restore(); });

    it('returns the translated term\'s categories', async () => {
      await service.findTranslations({ id: termId, language: 'English'});
      expect(model.fetchAll).to.have.been.calledWith({ withRelated: ['categories']});
    });

    describe('when searching for a translation in English', () => {
      it('returns the Spanish translation', async () => {
        await service.findTranslations({ id: termId, language: 'Spanish'});
        expect(query.where).to.have.been.calledWith('translations.source', '=', termId);
      });

    });
    describe('when searching for a translation in English', () => {
      it('returns the Spanish translation', async () => {
        await service.findTranslations({ id: termId, language: 'English'});
        expect(query.where).to.have.been.calledWith('translations.target', '=', termId);
      });
    });
  });
});
