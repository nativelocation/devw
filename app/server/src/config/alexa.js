const alexa = require("alexa-app");
const teamwork = require('../models/alexa');
const { DEBUG } = process.env;

const texts = {
    welcome: "Welcome to ClearView for SerpicoDev, you can ask for your status update or what are the total hours in a project.",
    totalHoursResult: "Your total hours for DevView Project is 65.08 hours.",
    statusUpdateResult: 'Your status update for DevView is "Doing progress on filter data".',
    noIntentFound: "CleaView Can't process that request right now, you can ask for your status update or total hours right now"
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

        alexaApp.launch((req, res) => res.say(texts.welcome).shouldEndSession(false));

        alexaApp.intent("TotalHoursIntent", defaultValues, (req, res) => {
            console.log('ALEXA TOTALHOURS res :', res);
            const projectId = 123;
            teamwork.getTimeAll().then(console.log);



            res.say(texts.totalHoursResult);
        });

        alexaApp.intent("StatusUpdateIntent", defaultValues, (req, res) => {
            console.log('ALEXA STATUSUPDATE res :', res);
            res.say(texts.statusUpdateResult);
        });


        alexaApp.messages.NO_INTENT_FOUND = texts.noIntentFound;
        // alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };
        // alexaApp.intent("TeamworkHoursIntent", {
        //     "slots": { "NAME": "LITERAL" },
        //     "utterances": [
        //         "my {name is|name's} {names|NAME}", "set my name to {names|NAME}"
        //     ]
        // },
        //     function (request, response) {
        //         response.say("Success!");
        //     }
        // );
    }
}