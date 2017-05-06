// @flow
import { OK } from 'http/status-codes';
import type { Request } from 'http/index';
import type HealthService from '../service/HealthService';
export default class SystemController {
  service: HealthService;

  constructor(service: HealthService) {
    this.service = service;
  }

  checkApplicationHealth(request: Request, reply: Function) {
    const healthCheckResult = this.service.checkHealth();
    reply(healthCheckResult).status = OK;
  }
}