import { should } from 'chai'
import HealthController from '../controllers'

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
