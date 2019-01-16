const alexa = require("../config/alexa");

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