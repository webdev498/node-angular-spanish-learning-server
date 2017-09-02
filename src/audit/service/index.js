import { logInfo } from './../../logging';
import Audit from './models/Audit';

export default class AuditService {
    async log (userId, eventId) {
        const auditInfo = {
            "id": "",
            "eventId": eventId,
            "userId": userId
        };

        logInfo('auditing event');
        return await Audit.forge(auditInfo)
            .save();
    }
}