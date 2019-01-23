const express = require("express");
const router = express.Router();
const model = require('../../models/clearview');
const texts = require('./clearview_texts');

router.post("/welcome", async (req, res, next) => {
    console.log('ALEXA WELCOME', req.body);
    let message = "";
    try {
        const { userId } = req.body;

        const exist = await model.getUserByAlexaId(userId);
        if (exist) {
            const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
            message = texts.welcomeBack.replace('{username}', userLogged.name);
        } else message = texts.welcome;
    } catch (e) {
        message = texts.genericError;
    }
    return res.status(201).json({ message });
});

router.post("/identify", async (req, res, next) => {
    console.log('ALEXA IDENTIFY', req.body);
    let message = "";
    try {
        const { number, userId, isConfirmed } = req.body;

        const exist = await model.getUserByAlexaId(userId);
        if (exist) {
            const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
            message = texts.youAreAlreadyLogged.replace('{username}', userLogged.name);
        } else {
            if (isConfirmed) {
                if (number && number.length == 4) {
                    const existCV = await model.getUserByPinOrId(number);
                    if (existCV) {
                        model.registerUser(userId, existCV.id);
                        message = texts.idenfitySuccess;
                    } else message = texts.idenfityErrorNotFound;
                } else message = texts.idenfityErrorRequired;
            } else message = texts.idenfityErrorNotConfirmed;
        }
    } catch (e) {
        message = texts.genericError;
    }
    return res.status(201).json({ message });
});

router.post("/logout", async (req, res, next) => {
    console.log('ALEXA Logout', req.body);
    let message = "";
    try {
        const { userId, isConfirmed } = req.body;

        const exist = await model.getUserByAlexaId(userId);
        if (!exist) message = texts.youAreNotLogged;
        else if (isConfirmed) {
            await model.removeUser(userId);
            message = texts.youAreNotLogged;
        } else message = texts.ok;
    } catch (e) {
        message = texts.genericError;
    }
    return res.status(201).json({ message });
});

router.post("/totalhours", async (req, res, next) => {
    console.log('ALEXA TOTALHOURS', req.body);
    let message = "";
    try {
        const { userId, period } = req.body;

        const exist = await model.getUserByAlexaId(userId);
        if (exist) {
            const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
            const time = await model.getTotalTime(userLogged.twid, period);
            message = `${texts.totalHoursResult.replace('{project}', userLogged.projectname)} ${time} hours${period ? ' for ' + period : ''}.`;
        } else message = texts.youAreNotLogged;
    } catch (e) {
        message = texts.genericError;
    }
    return res.status(201).json({ message });
});


router.post("/statusupdate", async (req, res, next) => {
    console.log('ALEXA STATUSUPDATE', req.body);
    let message = "";
    try {
        const { userId } = req.body;

        const exist = await model.getUserByAlexaId(userId);
        if (exist) {
            const userLogged = await model.getUserByPinOrId(exist.clearviewUserId, true);
            const status = await model.getStatusUpdate(userLogged.twid);
            if (status) message = `${texts.statusUpdateResult.replace('{project}', userLogged.projectname)} "${status}".`;
            else message = texts.noStatusUpdateResult.replace('{project}', userLogged.projectname);
        } else message = texts.youAreNotLogged;
    } catch (e) {
        message = texts.genericError;
    }
    return res.status(201).json({ message });
});
module.exports = router;
