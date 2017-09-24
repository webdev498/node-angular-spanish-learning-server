//@flow
var ActiveCampaign = require('activecampaign');
import type User from './../models/User';
import { logInfo, logError } from 'logging';

export default class CRMService {

  constructor() {}

  studyUserProcessed(user: User) {
      let post_data = userObject(user);

      try {
          let ac = new ActiveCampaign('https://commongroundinternational.api-us1.com',
              process.env.ACTIVE_CAMPAIGN_KEY);

          ac.api('contact/add?listid=29&service=unbounce',
              post_data, function (response) {
                  if (response.success) {
                      logInfo('paid study user sycned with crm');
                  }
                  else {
                      logError(response.error);
                  }
              });
      } catch (error) {
          logError(error);
      }      
  }

  syncUserWithCRM(user: User) {
    let post_data = userObject(user);

    try {
        let ac = new ActiveCampaign('https://commongroundinternational.api-us1.com', 
            process.env.ACTIVE_CAMPAIGN_KEY);
        
        ac.api('contact/add?listid=16&service=unbounce', 
            post_data, function(response) {
                if (response.success) {
                    logInfo('user sycned with crm');
                }
                else {
                    logError(response.error);
                }
            });
    } catch(error) {
        logError(error);
    }
  }

  userObject(user: User) {
      return {
          'email': user.get('email'),
          'first_name': user.get('firstName'),
          'last_name': user.get('lastName'),
          'p[21]': '21',
          'status[21]': '1'
      };
  }
}