const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const model = require('../models/goal');
const helpers = require('../config/helpers');
const { generalError, generalSuccess } = helpers;

router.use(jwt.verifyHelper);
router.get('/all', (req, res, next) => {
    model.getAll().then(r => generalSuccess(res, "Get task list", r)).catch(e => generalError(e, res));
});
router.get('/today', (req, res, next) => {
    model.getToday().then(r => generalSuccess(res, "Get task list", r)).catch(e => generalError(e, res));
});
router.post("/create", (req, res) => {
    model
        .create(req.body)
        .then(goal => generalSuccess(res, "Create Task Ok", { goal }))
        .catch(e => generalError(e, res));
});
router.put("/update", (req, res) => {
    model
        .update(req.body)
        .then(goal => generalSuccess(res, "Update Task Ok", { goal }))
        .catch(e => generalError(e, res));
});
router.put("/logicdelete", (req, res, next) => {
    model
        .logicDelete(req.body)
        .then(r => generalSuccess(res, "Task deleted", r))
        .catch(e => generalError(e, res));
});
router.delete("/delete", (req, res, next) => {
    model
        .delete(req.body)
        .then(r => generalSuccess(res, "Task deleted", r))
        .catch(e => generalError(e, res));
});

module.exports = router;