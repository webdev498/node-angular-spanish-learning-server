//@flow
import { logInfo } from './../../logging';
import Audit from './models/Audit';
const uuidv4 = require('uuid/v4');

export default class AuditService {
    async log (userId, eventId) {
        const auditInfo = {
            "id": uuidv4(),
            "eventId": eventId,
            "userId": userId
        };

        logInfo('auditing event');
        return await Audit.forge(auditInfo)
            .save();
    }
}