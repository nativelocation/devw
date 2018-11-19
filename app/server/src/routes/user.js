const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const model = require('../models/user');
const helpers = require('../config/helpers');
const { generalError, generalSuccess, busboy } = helpers;

router.post('/login', (req, res, next) => {
    const success = user => {
        const token = jwt.sign({ _id: user._id });
        generalSuccess(res, 'Auth successful', { token, user });
    }
    model.login(req.body).then(success).catch(e => generalError(e, res));
});

router.use(jwt.verifyHelper);
router.post('/create', (req, res) => {
    busboy(merge => {
        model.create(merge).then(user => generalSuccess(res, 'Create User Ok', { user })).catch(e => generalError(e, res));
    }, req)
});
router.get('/', (req, res, next) => {
    model.getById(req.body).then(r => generalSuccess(res, "Get all users", r)).catch(e => generalError(e, res));
});

router.get('/all', (req, res, next) => {
    model.getAll().then(r => generalSuccess(res, "Get users list", r)).catch(e => generalError(e, res));
});

module.exports = router;