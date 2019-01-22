const alexa = require("../config/alexa");
const model = require('./models/clearview');
const applicationId = 'amzn1.ask.skill.341f13f9-ba93-461c-a9c9-8f261ef6749c';
const texts = {
    welcome: "Welcome to ClearView for SerpicoDev, ",
    welcome2: "you can ask for a status update or your total hours, ",
    welcome3: "please say your PIN to log into your account.",
    welcomeBack: "Welcome back ",
    welcomeBack2: "what do you want to do today?",
    totalHoursResult: "Your total hours for {project} is",
    statusUpdateResult: 'Your status update for {project} is',
    noStatusUpdateResult: "There is no status update for {project}. Please request a status update from SerpicoDEV support.",
    noIntentFound: "CleaView Can't process that request right now, you can ask for your status update or total hours right now",
    genericError: "Ooh-uh, there's an error, please contact to SerpicoDev's Support",
    idenfitySuccess: "You are now logged in. You can ask for your total hours or status update.",
    idenfityErrorRequired: "A 4-Digit PIN is required to log in.",
    idenfityErrorNotFound: "The 4-Digit pin you provided doesn't exist, please, contact SerpicoDev or provide your pin access again.",
    idenfityErrorNotConfirmed: "A 4-Digit pin is required to identify you, please, contact SerpicoDev or provide your pin access again.",
    youAreNotLogged: "You are not logged into ClearView. Please provide a 4-Digit PIN.",
    youAreAlreadyLogged: "You are already logged as",
    youAreAlreadyLogged2: ", you can ask for your total hours or a status update.",
    ok: 'Okay!'
}

module.exports = {
    init: (app) => {
        const alexaApp = alexa.init("clearview", applicationId, app);
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
            const isConfirmed = req.isConfirmed();

            let message = "";
            const exist = await model.getUserByAlexaId(alexaUserId);
            if (exist) {
                const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
                message = `${texts.youAreAlreadyLogged} ${userLogged.name} ${texts.youAreAlreadyLogged2}`;
            } else {
                if (isConfirmed) {
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
            const isConfirmed = req.isConfirmed();

            let message = "";
            const exist = await model.getUserByAlexaId(alexaUserId);
            if (!exist) message = texts.youAreNotLogged;
            else {
                if (isConfirmed) {
                    await model.removeUser(alexaUserId);
                    message = texts.youAreNotLogged;
                } else message = texts.ok;
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
                    if (status) message = `${texts.statusUpdateResult.replace('{project}', userLogged.projectname)} "${status}".`;
                    else message = texts.noStatusUpdateResult.replace('{project}', userLogged.projectname);
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