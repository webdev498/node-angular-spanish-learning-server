import Orm from '../../data/orm';
import Base from './../../common/models/Base';

const tableName = 'audits';
const persistenceWhitelist = ['eventId', 'userId'];

const Audit = Base.extend({
    tableName,

    initialize(attributes) {
        Base.prototype.initialize.call(this, attributes, { persistenceWhitelist });
    },

    serialize() {
        const { id, eventId, userId } = this.attributes;

        return {
            id,
            eventId,
            userId
        };
    },

    validate() { }
});

export default Orm.model('Audit', Audit);
