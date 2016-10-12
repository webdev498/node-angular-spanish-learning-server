import * as http from 'http';
import type User from './../models/User';
import { logInfo, logError } from 'logging';

export default class CRMService {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  syncWithCRM() {
    let data = {
        'api_action' : 'contact_add',
        'api_key' : process.env.ACTIVE_CAMPAIGN_KEY,
        'email' : this.user.email,
        'first_name' : this.user.firstName,
        'last_name' : this.user.lastName,
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
        logError(`problem with request CRM sync request: ${e.message}`);
    });

    req.end();
  }
}