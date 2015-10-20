'use strict';

require('chai').should();
const HealthController = require('../controllers');

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
