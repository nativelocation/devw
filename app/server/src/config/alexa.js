const alexa = require("alexa-app");
const model = require('../models/alexa');

const pg = require('pg');
require('dotenv').config()

const { DEBUG } = process.env;

const texts = {
    welcome: "Welcome to ClearView for SerpicoDev, you can ask for your status update or what are the total hours in a project.",
    totalHoursResult: "Your total hours for ClearView Project is",
    statusUpdateResult: 'Your status update for ClearView is',
    noStatusUpdateResult: "There isn't status update for ClearView yet.",
    noIntentFound: "CleaView Can't process that request right now, you can ask for your status update or total hours right now",
    genericError: "Ooh-uh, there's an error, please contact to SerpicoDev's Support"
}

const defaultValues = {
    slots: {},
    utterances: []
}

module.exports = {
    init: (app) => {
        const alexaApp = new alexa.app("alexa");

        alexaApp.express({
            expressApp: app,
            checkCert: DEBUG ? false : true,
            debug: DEBUG ? true : false
        });

        // model.getStatusUpdate(302263).then(console.log);

        alexaApp.launch((req, res) => res.say(texts.welcome).shouldEndSession(false));
        alexaApp.intent("TotalHoursIntent", defaultValues, (req, res) => {
            console.log('ALEXA TOTALHOURS');
            const projectId = 302263;
            const period = req.slot('period');
            return model.getTotalTime(projectId, period)
                .then(h => res.say(`${texts.totalHoursResult} ${h} hours${period ? ' for ' + period : ''}.`).shouldEndSession(false))
                .catch(e => { console.log(e); res.say(texts.genericError) });
        });

        alexaApp.intent("StatusUpdateIntent", defaultValues, (req, res) => {
            console.log('ALEXA STATUSUPDATE res :', res);
            const projectId = 302263;
            return model.getStatusUpdate(projectId)
                .then(h => {
                    if (h) res.say(`${texts.statusUpdateResult} "${h}".`).shouldEndSession(false)
                    else res.say(texts.noStatusUpdateResult).shouldEndSession(false)
                })
                .catch(e => { console.log(e); res.say(texts.genericError) });
        });

        alexaApp.messages.NO_INTENT_FOUND = texts.noIntentFound;
    }
}