//@flow
import { logInfo, logError } from 'logging';
import Configuration from 'payment/models/Configuration';
import StudyBillingPlan from 'payment/models/StudyBillingPlan';
import UserPrinciple from 'users/models/User';
var paypal = require('paypal-rest-sdk');

export default class StudyBillingPlanService {

    constructor() {}

    configure() {
        let configuration = new Configuration();
        paypal.configure(configuration.config);
    }

    create() {
        this.configure();
        let studyBillingPlan = new StudyBillingPlan();
        
        return new Promise((resolve, reject) => {
            paypal.billingPlan.create(studyBillingPlan.billingPlanAttribs, function (error, billingPlanResponse){
                if (error){
                    logError(error);
                    reject(error);
                } else {
                    // Activate the plan by changing status to Active
                    paypal.billingPlan.update(billingPlanResponse.id, studyBillingPlan.billingPlanUpdateAttributes, 
                        function(error, response){
                        if (error) {
                            logError(error);
                            reject(error);
                        } else {
                            logInfo(`BillingPlanId Created${billingPlanResponse.id} Response:${JSON.stringify(response)}`);
                            resolve(billingPlanResponse.id);
                        }
                    });
                }
            });
        });
    }

    process(planId: string) {
        this.configure();
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
                    });

                    //if redirect url present, return user url
                    if (links.hasOwnProperty('approval_url')){
                        resolve({redirectUrl: links['approval_url'].href});
                    } else {
                        logError('no redirect URI present');
                    }
                }
            });
        });
    }

    finalizeStudy(principle: UserPrinciple, magicTicket: Object) {
        this.configure();
        const userId = principle.id;

        return new Promise((resolve, reject) => {
            paypal.billingAgreement.execute(magicTicket.token, {}, function (error, 
                billingAgreement) {
                if (error) {
                    reject(error);
                } else {
                    logInfo(JSON.stringify(billingAgreement));
                    let finalizeResponse = {
                        'userId': userId, 
                        'agreement': billingAgreement
                    };
                    resolve(finalizeResponse);
                }
            });
        });
    }

    cancelStudyBillingPlan(principle: UserPrinciple, billingAgreementId: string) {
        this.configure();
        const userId = principle.id;

        let cancel_note = {
            'note': 'Canceling the agreement'
        };

        return new Promise((resolve, reject) => {
            paypal.billingAgreement.cancel(billingAgreementId, cancel_note, function (error, response) {
                if (error) {
                    logError(error);
                    reject(error);
                } else {
                    logInfo(JSON.stringify(response));
                    let cancelResponse = {
                        'userId': userId, 
                        'agreement': response
                    }
                    resolve(cancelResponse);
                }
            });
        });
    }
}