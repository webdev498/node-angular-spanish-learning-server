import { logInfo, logError } from 'logging';
import EnvironmentConfiguration from 'payment/models/EnvironmentConfiguration';
import StudyBillingAgreement from 'payment/models/StudyBillingAgreement';
import UserPrinciple from 'users/models/User';
import * as paypal from 'paypal-rest-sdk';

export default class StudyBillingPlanService {

    configure() {
        let configuration = new EnvironmentConfiguration();
        paypal.configure(configuration.config);
    }

    create() {
        this.configure();
        let studyBillingPlan = new StudyBillingAgreement();
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
        let studyBillingPlan = new StudyBillingAgreement();
        // Use activated billing plan to create agreement

        return new Promise((resolve, reject) => {
            paypal.billingAgreement.create(studyBillingPlan.billingAgreementAttributes(planId), function (
                error, billingAgreement){
                if (error) {
                    logError(error);
                    reject(error);
                } else {
                    //capture HATEOAS links
                    const links = billingAgreement.links.reduce((memo, link) => {
                    const {rel, href, method } = link;
                    return memo[rel] = {href, method};
                    }, {});

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
                        userId,
                        'agreement': billingAgreement
                    };
                    resolve(finalizeResponse);
                }
            });
        });
    }

    cancelStudyBillingPlan(principle: UserPrinciple, billingAgreement: Object) {
        this.configure();
        const userId = principle.id;

        let cancel_note = {
            'note': 'Canceling the agreement'
        };

        return new Promise((resolve, reject) => {
            paypal.billingAgreement.cancel(billingAgreement.id, cancel_note, function (error, response) {
                if (error) {
                    logError(error);
                    reject(error);
                } else {
                    logInfo(JSON.stringify(response));
                    let cancelResponse = { 
                        userId,
                        'agreement': response 
                    };
                    resolve(cancelResponse);
                }
            });
        });
    }
}
