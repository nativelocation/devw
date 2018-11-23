const express = require('express');
const router = express.Router();
const model = require('../models/team');
const jwt = require('../config/jwt');
const helpers = require('../config/helpers');
const { generalError, generalSuccess } = helpers;

router.use(jwt.verifyHelper);
router.get('/all', (req, res, next) => {
    model.getAll().then(r => generalSuccess(res, "Get team list", r)).catch(e => generalError(e, res));
});

router.get('/get/:id', (req, res, next) => {
    console.log('ruta ', req.params);
    model.getById(req.params).then(r => generalSuccess(res, "Get team by id", r)).catch(e => generalError(e, res));
});

router.post('/create', (req, res, next) => {
    model.create(req.body).then(r => generalSuccess(res, "Team created", r)).catch(e => generalError(e, res));
});

router.post('/update', (req, res, next) => {
    model.update(req.body).then(r => generalSuccess(res, "Team updated", r)).catch(e => generalError(e, res));
});

router.post('/delete', (req, res, next) => {
    model.delete(req.body).then(r => generalSuccess(res, "Team deleted", r)).catch(e => generalError(e, res));
});

module.exports = router;