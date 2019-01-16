const alexa = require("alexa-app");
const AmazonSpeech = require('ssml-builder/amazon_speech');
require('dotenv').config()

const { DEBUG } = process.env;

module.exports = {
    init: (appName, app) => {
        const alexaApp = new alexa.app(`alexa/${appName}`);

        alexaApp.express({
            expressApp: app,
            checkCert: DEBUG ? false : true,
            debug: DEBUG ? true : false
        });

        return alexaApp;
    },
    defaultValues: {
        slots: {},
        utterances: []
    },
    AmazonSpeech
}