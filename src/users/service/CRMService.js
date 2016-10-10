var http = require('http');
import type User from './../models/User';
import { logInfo } from 'logging';

export default class CRMService {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  syncWithCRM() {
    let data = {};
    
    let options = {
        hostname: 'www.postcatcher.in',
        port: 80,
        path: '/catchers/544b09b4599c1d0200000289',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        form: data

    };

    let req = http.request(options, function(res) {
            logInfo(`CRM Request Status: ${res.statusCode}`);
            res.setEncoding('utf8');
            res.on('data', function (body) {
                logInfo(`CRM Response Body: ${body}`);
            });
        });

    req.on('error', function(e) {
        logInfo(`problem with request CRM sync request: ${e.message}`);
    });

    req.end();
  }
}