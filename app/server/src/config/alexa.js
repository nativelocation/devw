const alexa = require("alexa-app");
const AmazonSpeech = require('ssml-builder/amazon_speech');
require('dotenv').config()

const { DEBUG } = process.env;
const applicationId = 'amzn1.ask.skill.341f13f9-ba93-461c-a9c9-8f261ef6749c';

module.exports = {
    init: (appName, app) => {
        const alexaApp = new alexa.app(`alexa/${appName}`);

        alexaApp.express({
            expressApp: app,
            checkCert: DEBUG ? false : true,
            debug: DEBUG ? true : false,
            
        });

        alexaApp.pre = request => {
            const appId = request.sessionDetails.application.applicationId;
            if (appId !== applicationId) throw 'Invalid application Id: ' + appId;
        };

        return alexaApp;
    },
    defaultValues: {
        slots: {},
        utterances: []
    },
    AmazonSpeech
}