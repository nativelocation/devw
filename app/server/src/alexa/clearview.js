const alexa = require("../config/alexa");
const model = require('./models/clearview');

const texts = {
    welcome: "Welcome to ClearView for SerpicoDev, ",
    welcome2: "you can ask for your status update or what are the total hours in a project, ",
    welcome3: "please, provide your pin access so we can know who are you.",
    welcomeBack: "Welcome back ",
    welcomeBack2: "what do you want to do today?",
    totalHoursResult: "Your total hours for {project} is",
    statusUpdateResult: 'Your status update for {project} is',
    noStatusUpdateResult: "There isn't status update for {project} yet.",
    noIntentFound: "CleaView Can't process that request right now, you can ask for your status update or total hours right now",
    genericError: "Ooh-uh, there's an error, please contact to SerpicoDev's Support",
    idenfitySuccess: "You're now logged, you can ask for you total hours or your status update.",
    idenfityErrorRequired: "A 4-Digit pin is required to identify you.",
    idenfityErrorNotFound: "The 4-Digit pin you provided doesn't exist, please, contact SerpicoDev or provide your pin access again.",
    idenfityErrorNotConfirmed: "A 4-Digit pin is required to identify you, please, contact SerpicoDev or provide your pin access again.",
    youAreNotLogged: "You are not identified, provide a 4-Digit to identify you before to get an status update or total hours of your project.",
    youAreAlreadyLogged: "You are already logged as",
    youAreAlreadyLogged2: ", you can ask for you total hours or your status update.",
    ok: 'Okay!'
}

module.exports = {
    init: (app) => {
        const alexaApp = alexa.init("clearview", app);
        alexaApp.launch(async (req, res) => {
            const alexaUserId = req.userId;
            const exist = await model.getUserByAlexaId(alexaUserId);
            let message = "";
            if (exist) {
                const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
                message = `${texts.welcomeBack} ${userLogged.name}, ${texts.welcomeBack2}`;
            } else {
                const speech = new alexa.AmazonSpeech()
                    .say(texts.welcome)
                    .pause('1s')
                    .say(texts.welcome2)
                    .pause('1s')
                    .say(texts.welcome3);
                message = speech.ssml();
            }
            res.say(message).shouldEndSession(false);
        });

        alexaApp.intent("IndentifyIntent", alexa.defaultValues, async (req, res) => {
            console.log('ALEXA IDENTIFY');
            const number = req.slot('number');
            const alexaUserId = req.userId;
            let message = "";

            const exist = await model.getUserByAlexaId(alexaUserId);
            if (exist) {
                const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
                message = `${texts.youAreAlreadyLogged} ${userLogged.name} ${texts.youAreAlreadyLogged2}`;
            } else {
                if (req.isConfirmed()) {
                    if (number && number.length == 4) {
                        const existCV = await model.getUserByPinOrId(number);
                        if (existCV) {
                            model.registerUser(alexaUserId, existCV.id);
                            message = texts.idenfitySuccess;
                        } else message = texts.idenfityErrorNotFound;
                    } else message = texts.idenfityErrorRequired;
                } else message = texts.idenfityErrorNotConfirmed;
            }
            return res.say(message).shouldEndSession(false);
        });


        alexaApp.intent("LogoutUserIntent", alexa.defaultValues, async (req, res) => {
            console.log('ALEXA Logout');
            const alexaUserId = req.userId;
            let message = "";

            const exist = await model.getUserByAlexaId(alexaUserId);
            if (!exist) message = texts.youAreNotLogged;
            else {
                if (req.isConfirmed()) {
                    await model.removeUser(alexaUserId);
                    message = texts.youAreNotLogged;
                } else message = texts.idenfityErrorNotConfirmed;
            }

            return res.say(message).shouldEndSession(false);
        });

        alexaApp.intent("TotalHoursIntent", alexa.defaultValues, async (req, res) => {
            try {
                console.log('ALEXA TOTALHOURS');
                const period = req.slot('period');
                const alexaUserId = req.userId;

                const exist = await model.getUserByAlexaId(alexaUserId);
                let message = "";
                if (exist) {
                    const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
                    const time = await model.getTotalTime(userLogged.twid, period);
                    message = `${texts.totalHoursResult.replace('{project}', userLogged.projectname)} ${time} hours${period ? ' for ' + period : ''}.`;
                } else message = texts.youAreNotLogged;

                return res.say(message).shouldEndSession(false);
            } catch (e) {
                console.log('error :', e);
                return res.say(texts.genericError);
            }
        });

        alexaApp.intent("StatusUpdateIntent", alexa.defaultValues, async (req, res) => {
            try {
                console.log('ALEXA STATUSUPDATE');
                const alexaUserId = req.userId;

                const exist = await model.getUserByAlexaId(alexaUserId);
                let message = "";
                if (exist) {
                    const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
                    const status = await model.getStatusUpdate(userLogged.twid);
                    message = `${texts.statusUpdateResult.replace('{project}', userLogged.projectname)} "${status}".`;
                } else message = texts.youAreNotLogged;

                return res.say(message).shouldEndSession(false);
            } catch (e) {
                console.log('error :', e);
                return res.say(texts.genericError);
            }
        });

        alexaApp.messages.NO_INTENT_FOUND = texts.noIntentFound;
    }
}