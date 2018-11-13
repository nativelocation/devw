const express = require('express');
const router = express.Router();
const model = require('../models/team');
const helpers = require('../config/helpers');
const { generalError } = helpers;

router.get('/', (req, res, next) => {
    res.send('Team');
});

//GET ALL
const getAll = (req, res, next) => {

    const success = data => {
        return res.status(201).json({
            status: 201,
            message: 'Get All Team',
            data
        });
    }
    model.getAll().then(success).catch(e => generalError(e, res));
}
router.get('/get', getAll);

//GET BY ID
const getById = (req, res, next) => {
    const success = data => {
        return res.status(201).json({
            status: 201,
            message: 'Get Team',
            data
        });
    }
    model.getById(req.params).then(success).catch(e => generalError(e, res));
}
router.get('/get/:id', getById);

//CREATE
const create = (req, res, next) => {
    const success = data => {
        return res.status(201).json({
            status: 201,
            message: 'Team Created',
            data
        });
    }
    model.create(req.body).then(success).catch(e => generalError(e, res));
}
router.post('/create', create);

//UPDATE
const update = (req, res, next) => {
    const success = data => {
        return res.status(201).json({
            status: 201,
            message: 'Team updated',
            data
        });
    }
    model.update(req.body).then(success).catch(e => generalError(e, res));
}
router.post('/edit', update);

//DELETE
const remove = (req, res, next) => {
    const success = data => {
        return res.status(201).json({
            status: 201,
            message: 'Team deleted',
            data
        });
    }
    model.delete(req.body).then(success).catch(e => generalError(e, res));
}
router.post('/delete', remove);

module.exports = router;