//@flow
import { logInfo, logError } from 'logging';
import type Configuration from './../models/Configuration';
import type StudyBillingPlan from './../models/StudyBillingPlan';
var paypal = require('paypal-rest-sdk');

export default class BillingPlanService {
    constructor() {}

    configure() {
        let configuration = new Configuration();
        paypal.configure(configuration.config);
    }

    create() {
        this.configure();
        let studyBillingPlan = new StudyBillingPlan();
        
        return new Promise((resolve, reject) => {
            paypal.billingPlan.create(studyBillingPlan.billingPlanAttribs, function (error, billingPlan){
                if (error){
                    logError(error);
                    reject(error);
                } else {
                    // Activate the plan by changing status to Active
                    paypal.billingPlan.update(billingPlan.id, studyBillingPlan.billingPlanUpdateAttributes, 
                        function(error, response){
                        if (error) {
                            logError(error);
                            reject(error);
                        } else {
                            logInfo(`BillingPlanId Created${billingPlan.id}`);
                            resolve(billingplan.id);
                        }
                    });
                }
            });
        }
    }

    process(planId) {
        
    }
}