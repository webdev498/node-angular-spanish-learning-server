import { logInfo } from './../../logging';
import Audit from 'auditing/models/Audit';
const uuid = require('uuid');
import Event from 'auditing/models/Event';

export default class AuditService {
    async userLoggedIn (user) {
        const event = new Event();
        const eventId = event.UserLoggedIn;
        const auditInfo = {
            "id": uuid.v4(),
            "eventId": eventId,
            "userId": user.get('id')
        };

        logInfo('auditing event');
        return await Audit.forge(auditInfo)
            .save();
    }
}