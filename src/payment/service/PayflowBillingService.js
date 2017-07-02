import { logInfo, logError } from 'logging';
import Payflow_api from 'payment/payflow/paypal-payflow-sdk';

export default class PayflowBillingService {
    create(data) {
        let api = new Payflow_api();
        let createRecurringBillingProfile = api.getModel("createrecurringbillingprofile");

        createRecurringBillingProfile.exchangeData(data);
        createRecurringBillingProfile.validateData();

        return new Promise((resolve, reject) => {
            api.executeHttp(createRecurringBillingProfile.getParameters(), function (err, res) {
                if (err) { reject(err); logError(err); }
                logInfo('Success');
                logInfo(res);
                resolve(res);
            });
        });
    }

    cancel(profileId) {
        let api = new Payflow_api();
        let cancelRecurringBillingProfile = api.getModel("cancelrecurringbillingprofile");

        const data = {
            "ORIGPROFILEID": profileId
        };

        cancelRecurringBillingProfile.exchangeData(data);
        cancelRecurringBillingProfile.validateData();

        return new Promise((resolve, reject) => {
            api.executeHttp(cancelRecurringBillingProfile.getParameters(), function (err, res) {
                if (err) { reject(err); logError(err); }
                logInfo('Success.  Billing Cancelled');
                logInfo(res);
                resolve(res);
            });
        }); 
    }
}
