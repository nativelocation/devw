const goal = require('../database/goal');
const bcrypt = require('bcryptjs');
const moment = require('moment');
//{ userId, task, taskDate, checked, isDelete, created_at, updated_at }
const model = {
    create: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.userId) throw { code: 400, msg: "Id is required" };
        if (!data.task) throw { code: 400, msg: "Task is required" };
        if (!data.taskDate) throw { code: 400, msg: "Date is required" };
        data.checked = false;
        data.isDelete = false;
        data.created_at = moment.utc().format();
        data.updated_at = moment.utc().format();
        return await goal.create(data);
    },
    update: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        data.updated_at = moment.utc().format();
        return await goal.update(data.id, data);
    },
    delete: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await goal.delete(data._id);
    },
    getAll: async () => {
        return await goal.getAll();
    },
    getById: async data => {
        if (!data) throw { code: 400, msg: "Data is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await goal.getById(data._id);
    }
}

module.exports = model;