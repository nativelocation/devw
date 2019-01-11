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

        alexaApp.launch((req, res) => {
            console.log(req.userId);

//check login
//true
//welcome back alexander, what do you want to do?
//false
//in order to use clearview, please tell me your pin access

            res.say(texts.welcome).shouldEndSession(false)
        });
//first check if you're already logged, if yes, tell the user is logged and explain he needs to say "change account"
//pin intent with confirmation
//yes
//find pin
//found - register
//notfound - pin not found, try again


//change account intent




        alexaApp.intent("TotalHoursIntent", defaultValues, (req, res) => {
            console.log('ALEXA TOTALHOURS');
            const projectId = 302263;
            const period = req.slot('period');
            return model.getTotalTime(projectId, period)
                .then(h => res.say(`${texts.totalHoursResult} ${h} hours${period ? ' for ' + period : ''}.`).shouldEndSession(false))
                .catch(e => { console.log(e); res.say(texts.genericError) });
        });

        alexaApp.intent("StatusUpdateIntent", defaultValues, (req, res) => {
            console.log('ALEXA STATUSUPDATE');
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