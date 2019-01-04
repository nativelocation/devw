const express = require('express');
const router = express.Router();
const tw = require('../config/teamwork');

router.get('/projects', (req, res, next) => {
    const projects = tw.getProjects();
    console.log(projects);
});

module.exports = router;