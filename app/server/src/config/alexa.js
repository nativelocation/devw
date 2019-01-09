const alexa = require("alexa-app");
const { DEBUG } = process.env;

module.exports = {
    init: (app) => {
        const alexaApp = new alexa.app("alexa");
        alexaApp.express({
            expressApp: app,
            checkCert: DEBUG ? false : true,
            debug: DEBUG ? true : false
        });
        alexaApp.launch(function (request, response) {
            response.say("You launched the app!");
        });

        alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

        alexaApp.intent("TeamworkHoursIntent", {
            "slots": { "NAME": "LITERAL" },
            "utterances": [
                "my {name is|name's} {names|NAME}", "set my name to {names|NAME}"
            ]
        },
            function (request, response) {
                response.say("Success!");
            }
        );
    }
}