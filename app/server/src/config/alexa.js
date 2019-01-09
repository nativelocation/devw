const alexa = require("alexa-app");
const { DEBUG } = process.env;

const texts = {
    welcome: "Welcome to clearview for SerpicoDev, please ask anything you need.",
    totalHoursResult: "Your total hours for DevView Project is 125hours.",
    statusUpdateResult: 'Your status update for DevView is "Doing progress on filter data".'
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

        alexaApp.launch((req, res) => res.say(texts.welcome));

        alexaApp.intent("TotalHoursIntent", defaultValues, (req, res) => {
            console.log('ALEXA TOTALHOURS res :', res);
            res.say(texts.totalHoursResult);
        });

        alexaApp.intent("StatusUpdateIntent", defaultValues, (req, res) => {
            console.log('ALEXA STATUSUPDATE res :', res);
            res.say(texts.statusUpdateResult);
        });


        alexaApp.messages.NO_INTENT_FOUND = "Why you called dat intent? I don't know about dat";
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