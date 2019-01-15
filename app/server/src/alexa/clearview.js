const alexa = require("../config/alexa");
const model = require('./models/clearview');

const texts = {
    welcome: "Welcome to ClearView for SerpicoDev, ",
    welcome2: "you can ask for your status update or what are the total hours in a project, ",
    welcome3: "please, provide your pin access so we can know who are you.",
    welcomeBack: "Welcome back ",
    welcomeBack2: "what do you want to do today?",
    totalHoursResult: "Your total hours for ClearView Project is",
    statusUpdateResult: 'Your status update for ClearView is',
    noStatusUpdateResult: "There isn't status update for ClearView yet.",
    noIntentFound: "CleaView Can't process that request right now, you can ask for your status update or total hours right now",
    genericError: "Ooh-uh, there's an error, please contact to SerpicoDev's Support"
}

module.exports = {
    init: (app) => {
        const alexaApp = alexa.init("clearview", app);
        alexaApp.launch((req, res) => {
            console.log(req.userId);
            let message = "";
            //check login
            if (false) message = `${texts.welcomeBack} ${"Alexander Guzman"}, ${texts.welcomeBack2}`;
            else {
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
        //first check if you're already logged, if yes, tell the user is logged and explain he needs to say "change account"
        //pin intent with confirmation
        //yes
        //find pin
        //found - register
        //notfound - pin not found, try again


        //change account intent

        alexaApp.intent("TotalHoursIntent", alexa.defaultValues, (req, res) => {
            console.log('ALEXA TOTALHOURS');
            const projectId = 302263;
            const period = req.slot('period');
            return model.getTotalTime(projectId, period)
                .then(h => res.say(`${texts.totalHoursResult} ${h} hours${period ? ' for ' + period : ''}.`).shouldEndSession(false))
                .catch(e => { console.log(e); res.say(texts.genericError) });
        });

        alexaApp.intent("StatusUpdateIntent", alexa.defaultValues, (req, res) => {
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