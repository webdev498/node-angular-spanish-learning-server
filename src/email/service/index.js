var aws = require('aws-sdk');
import { logInfo, logError } from './../../logging';
import type Message from './../models/Message';

export const send = (message: Message) => {
    aws.config.update({
        accessKeyId: process.env.SES_KEY,
        secretAccessKey: process.env.SES_SECRET,
        region: 'us-east-1'
    });

    let ses = new aws.SES();

    let params = {
        Destination: { 
            BccAddresses: [],
            CcAddresses: [],
            ToAddresses: [message.recipient.get('email')]
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

    return new Promise((resolve) => {
        logInfo('sending email');
        ses.sendEmail(params, function(err, data) {
            if (err) {
                logError(err);
                resolve();
            }
            else     {
                logInfo('email sent successfully');
                resolve(data);
            }
        });
    });
};