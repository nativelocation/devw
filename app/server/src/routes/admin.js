const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const model = require('../models/teamwork');
const helpers = require('../config/helpers');
const { generalError, generalSuccess } = helpers;

router.use(jwt.verifyHelper);
// router.get('/', (req, res, next) => {
//     model.getProjects().then(r => generalSuccess(res, "Get project list", r)).catch(e => generalError(e, res));
// });

module.exports = router;