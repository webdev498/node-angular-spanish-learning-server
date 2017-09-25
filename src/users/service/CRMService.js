//@flow
var ActiveCampaign = require('activecampaign');
import type User from './../models/User';
import { logInfo, logError } from 'logging';

export default class CRMService {

  constructor() {}

  studyUserProcessed(user: User) {
      let post_data = this._userObject(user);

      try {
          const ac = this._activeCampaignObject();

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

  studyUserCancelled(user: User) {
      let post_data = this._userObject(user);

      try {
          const ac = this._activeCampaignObject();

          ac.api('contact/add?listid=30&service=unbounce',
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
    let post_data = this._userObject(user);

    try {
        const ac = this._activeCampaignObject();
        
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

  _userObject(user) {
      return {
          'email': user.get('email'),
          'first_name': user.get('firstName'),
          'last_name': user.get('lastName'),
          'p[21]': '21',
          'status[21]': '1'
      };
  }

  _activeCampaignObject() {
      return new ActiveCampaign('https://commongroundinternational.api-us1.com',
          process.env.ACTIVE_CAMPAIGN_KEY);
  }
}