// @flow

import runtime from 'v8';
import operatingSystem from 'os';
const pkg = require('../../../package.json');


const bytesToMegabytes = (bytes) => (bytes / 1024) / 1024;

export default class HealthService {

  checkHealth() {
    const virtualMachine = runtime.getHeapStatistics();
    const operatingSystem = new OperatingSystemInformation();
    const { version, name } = pkg;
    const versions = process.versions;
    return { application: { name, version }, operatingSystem, virtualMachine, versions };
  }

}

class OperatingSystemInformation {
  type: string;
  cpuArchitecture: string;
  cpus: Array<Object>;
  freeMemory: string;
  availableMemory: number;
  totalMemory: number;
  upTime: number;


  constructor() {
    this.type = `${operatingSystem.type()} (${operatingSystem.platform()})`
    this.cpuArchitecture = operatingSystem.arch();
    this.cpus = operatingSystem.cpus().map(({ model, speed }) => ({ model, speed }));
    this.availableMemory = bytesToMegabytes(operatingSystem.freemem());
    this.totalMemory = bytesToMegabytes(operatingSystem.totalmem());
    this.upTime = operatingSystem.uptime() / 60;
  }
}