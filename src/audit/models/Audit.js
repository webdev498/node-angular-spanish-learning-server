/* @flow */
import Orm from 'data/orm';
import Base from 'models/Base';

const tableName = 'audits';
const persistenceWhitelist = [
    'eventId',
    'userId',
    'createdAt'];

const Audit = Base.extend({
    tableName,

    initialize(attributes) {
        Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
    },

    serialize() {
        const {
      id, createdAt, userId, eventId
    } = this.attributes;
        const { relations } = this;

        return {
            id,
            createdAt,
            userId,
            eventId,
            relations
        };
    },

    validate() { }
});

export default Orm.model('Audit', Audit);
