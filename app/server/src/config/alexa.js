const alexa = require("alexa-app");
const AmazonSpeech = require('ssml-builder/amazon_speech');
require('dotenv').config()

const { DEBUG } = process.env;

module.exports = {
    init: (appName, appId, app) => {
        const alexaApp = new alexa.app(`alexa/${appName}`);

        alexaApp.express({
            expressApp: app,
            checkCert: DEBUG ? false : true,
            debug: DEBUG ? true : false,

        });

        alexaApp.pre = request => {
            const { applicationId } = request.sessionDetails.application;
            if (appId !== applicationId) throw 'Invalid application Id: ' + applicationId + ' vs ' + appId;
        };

        return alexaApp;
    },
    defaultValues: {
        slots: {},
        utterances: []
    },
    AmazonSpeech
}