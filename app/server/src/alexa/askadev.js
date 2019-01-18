const alexa = require("../config/alexa");
const applicationId = 'amzn1.ask.skill.b5133612-ec31-4b22-b1b3-02a56b98ffef';

const texts = {
    welcome: "Welcome to Ask a Developer for SerpicoDev, ",
    ok: 'Okay!'
}
module.exports = {
    init: (app) => {
        const alexaApp = alexa.init("askadev", app);
        alexaApp.launch(async (req, res) => {
            const alexaUserId = req.userId;

            res.say(texts.welcome).shouldEndSession(false);
        });

        // alexaApp.messages.NO_INTENT_FOUND = texts.noIntentFound;
    }
}