export default class StudyBillingPlan {
    constructor() {
        this.isoDate = new Date();
        isoDate.setSeconds(isoDate.getSeconds() + 4);
        isoDate.toISOString().slice(0, 19) + 'Z';
    }

    this.isoDate = null;

    get billingAgreementAttributes(planId) {
        return {
            "name": "Premium Study Guide Membership",
            "description": "Premium CGI Unrestricted test and study guide access",
            "start_date": this.isoDate,
            "plan": {
                "id": planId
            },
            "payer": {
                "payment_method": "paypal"
            }
        };
    }

    get billingPlanAttribs() {
        return {
            "name": "Premium CGI Unrestricted test and study guide access",
            "description": "Monthly plan for Premium Unrestricted access",
            "type": "fixed",
            "payment_definitions": [{
                "name": "Premium Study Guide Plan",
                "type": "REGULAR",
                "frequency_interval": "1",
                "frequency": "MONTH",
                "cycles": "11",
                "amount": {
                    "currency": "USD",
                    "value": "4.99"
                }
            }],
            "merchant_preferences": {
                "setup_fee": {
                    "currency": "USD",
                    "value": "0"
                },
                "cancel_url": process.env.PP_CANCEL_URL,
                "return_url": process.env.PP_AGREEMENT_URL,
                "max_fail_attempts": "0",
                "auto_bill_amount": "YES",
                "initial_fail_amount_action": "CONTINUE"
            }
        }
    }

    get billingPlanUpdateAttribs() {
        return [{
            "op": "replace",
            "path": "/",
            "value": {
                "state": "ACTIVE"
            }
        }];
    }
}