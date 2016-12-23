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
        let studyBillingPlan = new StudyBillingPlan();
        // Use activated billing plan to create agreement

        return new Promise((resolve, reject) => {
            paypal.billingAgreement.create(studyBillingPlan.billingAgreementAttributes(planId), function (
                error, billingAgreement){
                if (error) {
                    logError(error);
                    reject(error);
                } else {
                    //capture HATEOAS links
                    var links = {};
                    billingAgreement.links.forEach(function(linkObj){
                        links[linkObj.rel] = {
                            'href': linkObj.href,
                            'method': linkObj.method
                        };
                    })

                    //if redirect url present, return user url
                    if (links.hasOwnProperty('approval_url')){
                        resolve({redirectUrl: links['approval_url'].href});
                    } else {
                        logError('no redirect URI present');
                    }
                }
            });
        }
    }

    finalize(magicTicket) {
        return new Promise((resolve, reject) => {
            paypal.billingAgreement.execute(magicTicket, {}, function (error, 
                billingAgreement) {
                if (error) {
                    reject(error);
                } else {
                    //save to user object
                    logInfo(JSON.stringify(billingAgreement));
                }
            });
        }
    }
}