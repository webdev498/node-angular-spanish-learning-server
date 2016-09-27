var aws = require('aws-sdk');
import { logInfo } from './../../logging';

export const send = (message) => {
    aws.config.update({
        accessKeyId: process.env.SES_KEY,
        secretAccessKey: process.env.SES_SECRET
    });

    let ses = new aws.SES();

    let params = {
        Destination: { 
            BccAddresses: [],
            CcAddresses: [],
            ToAddresses: [message.recipient.email]
        },
        Message: { 
            Body: { 
            Html: {
                Data: message.body
            }},
                Subject: { 
                Data: message.subject
            }},
        Source: message.from,
        ReplyToAddresses: [message.from]
    };

    return new Promise((resolve, reject) => {
        logInfo('sending email');
        ses.sendEmail(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else     {
                logInfo('email sent successfully');
                resolve(data);
            }
        });
    });
};