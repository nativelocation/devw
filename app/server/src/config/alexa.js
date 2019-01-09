const alexa = require("alexa-app");
const { DEBUG } = process.env;

const texts = {
    welcome: "Welcome to clearview for SerpicoDev, please ask anything you need.",
    totalHoursResult: "Your total hours for DevView Project is 65.08 hours.",
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

        alexaApp.launch((req, res) => res.say(texts.welcome).shouldEndSession(false));

        alexaApp.intent("TotalHoursIntent", defaultValues, (req, res) => {
            console.log('ALEXA TOTALHOURS res :', res);
            res.say(texts.totalHoursResult);
        });

        alexaApp.intent("StatusUpdateIntent", defaultValues, (req, res) => {
            console.log('ALEXA STATUSUPDATE res :', res);
            res.say(texts.statusUpdateResult);
        });


        alexaApp.messages.NO_INTENT_FOUND = "CleaView Can't process that request right now, you can ask for your status update or total hours right now";
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