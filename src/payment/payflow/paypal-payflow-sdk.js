import { logError } from 'logging';
var https = require('https');
var querystring = require('querystring');
//Remove escape from query string
querystring.escape = function (str) { return str; };

export default class Payflow_api {
    constructor() {
        this.default_options = {
            "schema": 'https',
            "host": process.env.PAYFLOW_HOST,
            "headers": { 'Content-Type': 'application/x-www-form-urlencoded' },
            "timeout": 30000,
            "port": "443",
            "credentials": {
                "PARTNER": process.env.PAYFLOW_PARTNER,
                "VENDOR": process.env.PAYFLOW_VENDOR,
                "USER": process.env.PAYFLOW_USER,
                "PWD": process.env.PAYFLOW_PWD
            }
        };
    }

    executeHttp(data, cb) {
        var error = null;
        let context = this;
        const query = Object.assign(this.default_options.credentials, data);

        var string = querystring.stringify(query);

        var options = {
            "hostname": this.default_options.host,
            "port": 443,
            "method": 'POST',
            "headers": Object.assign(this.default_options.headers, { 'Content-Length': string.length })
        };

        var req = https.request(options, function (res) {
            var body = '';

            res.on('data', function (chunk) {
                body += chunk;
            });
            
            res.on('end', function () {

                var response = querystring.parse(body);

                if (response.RESULT !== "0") {
                    error = new Error(body);
                    logError(error);
                }

                var ret = {
                    submit: {
                        endpoint: 'https://' + context.default_options.host,
                        raw: string,
                        decoded: query
                    },
                    response: {
                        endpoint: 'https://' + context.default_options.host,
                        raw: body,
                        decoded: querystring.parse(body)
                    }
                };

                cb(error, ret);
            });
        });
        req.end(string);
        req.on('error', function (e) {
            //console.log('problem with request: ' + e.message);
            cb(e, null);
        });

        req.on('socket', function (socket) {
            socket.setTimeout(context.default_options.timeout);
            socket.on('timeout', function () {
                req.abort();
            });
        });
    }

    getModel(model) {
        switch (model) {

            case "sale":
                return require('payment/payflow/models/DirectPayments/sale')();

            case "authorization":
                return require('payment/payflow/models/DirectPayments/authorization')();

            case "capture":
                return require('payment/payflow/models/DirectPayments/capture')();

            case "reference":
                return require('payment/payflow/models/DirectPayments/reference')();

            case "refund":
                return require('payment/payflow/models/DirectPayments/refund')();

            case "nonreferencedcredit":
                return require('payment/payflow/models/DirectPayments/nonreferencedcredit')();

            case "void":
                return require('payment/payflow/models/DirectPayments/void')();

            case "setexpresscheckout":
                return require('payment/payflow/models/ExpressCheckout/setexpresscheckout')();

            case "setexpresscheckoutrb":
                return require('payment/payflow/models/ExpressCheckout/RecurringBilling/setexpresscheckout');

            case "setexpresscheckoutba":
                return require('payment/payflow/models/ExpressCheckout/BillingAgreements/setexpresscheckout');

            case "getexpresscheckout":
                return require('payment/payflow/models/ExpressCheckout/getexpresscheckout')();

            case "doexpresscheckout":
                return require('payment/payflow/models/ExpressCheckout/doexpresscheckout')();

            case "createrecurringbillingprofile":
                return require('payment/payflow/models/RecurringBilling/createRecurringBillingProfile')();

            case "eccreaterecurringbillingprofile":
                return require('payment/payflow/models/RecurringBilling/createRecurringBillingProfile')('ec');

            case "convertrecurringbillingprofile":
                return require('payment/payflow/models/RecurringBilling/convertRecurringBillingProfile')();

            case "ecconvertrecurringbillingprofile":
                return require('payment/payflow/models/RecurringBilling/convertRecurringBillingProfile')('ec');

            case "cancelrecurringbillingprofile":
                return require('payment/payflow/models/RecurringBilling/cancelRecurringBillingProfile')();

            case "modifyrecurringbillingprofile":
                return require('payment/payflow/models/RecurringBilling/modifyRecurringBillingProfile')();

            default:
                throw new Error(model + ":Model not defined.");
        }
    }
}

