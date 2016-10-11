var http = require('http');
import type User from './../models/User';
import { logInfo } from 'logging';

export default class CRMService {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  syncWithCRM() {
    let data = {
        'api_action' : 'contact_add',
        'api_key' : '5d108c2b1412ff154aeb08e5a8505bcc1d2d7a53e9d422d7ad12262371187060a9be2350',
        'email' : this.user.email,
        'first_name' : this.user.first_name,
        'last_name' : this.user.last_name,
        'p[21]' : '21'
    };
    
    let options = {
        hostname: 'https://commongroundinternational.api-us1.com',
        port: 80,
        path: '/admin/api.php?api_action=contact_add',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
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