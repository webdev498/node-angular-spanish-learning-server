//@flow
import { logError } from './../logging';
import type AuditService from './service';
import Event from './models/Event';

export default class AuditController {
    service: AuditService;

    constructor(service: AuditService) {
        this.service = service;
    }

    async userLoggedIn(userId) {
        const event = new Event();
        const userLoggedInEvent = event.UserLoggedIn;
        try {
            await this.service.log(userId, userLoggedInEvent);
        } catch (error) {
            logError(error);
            throw (error);
        }
    }

}
