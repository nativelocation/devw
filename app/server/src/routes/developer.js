const express = require("express");
const router = express.Router();
const jwt = require("../config/jwt");
const model = require("../models/developer");
const helpers = require("../config/helpers");
const { generalError, generalSuccess } = helpers;

router.use(jwt.verifyHelper);

router.get("/all", (req, res, next) => {
    model
    .getAll()
    .then(r => generalSuccess(res, "Get developer list", r))
    .catch(e => generalError(e, res));
});
router.post("/", (req, res, next) => {
  model
    .getDeveloperByApiId(req.body)
    .then(r => generalSuccess(res, "Get user by id", r))
    .catch(e => generalError(e, res));
});
router.post('/create', (req, res, next) => {
    model.create(req.body).then(r => generalSuccess(res, "Get all time list", r)).catch(e => generalError(e, res));
});
router.put("/update", (req, res) => {
  model
    .update(req.body)
    .then(user => generalSuccess(res, "Update User Ok", { user }))
    .catch(e => generalError(e, res));
});
router.post("/delete", (req, res, next) => {
  model
    .delete(req.body)
    .then(r => generalSuccess(res, "User deleted", r))
    .catch(e => generalError(e, res));
});
module.exports = router;
