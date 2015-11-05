'use strict';
import { should } from 'chai'
import HealthController from '../controllers';
// Setup should
should();

describe('Health Controller', () => {
  describe('show action', () => {
    let subject;
    beforeEach(() => {
      subject = new HealthController();
    });
    it('renders a JSON representation of a Status resource', () => {
      subject.show.should.be.a('Function');
    });
  });
});
