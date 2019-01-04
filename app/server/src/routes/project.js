const express = require('express');
const router = express.Router();
const tw = require('../config/teamwork');

router.get('/all', (req, res, next) => {
    const projects = tw.getProjects()
    projects.then(res => {
        // console.log(res)
        return res
    }).catch(err => {
        console.error(err);
    });
});

module.exports = router;