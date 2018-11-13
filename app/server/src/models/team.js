const team = require('../database/team');

const model = {
    create: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.name) throw { code: 400, msg: "Name is required" };
        return await team.create(data);
    },
    update: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.name) throw { code: 400, msg: "Name is required" };
        const { name } = data;
        const values = { name: name };
        return await team.update(data._id, values);
    },
    delete: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await team.delete(data._id);
    },
    getAll: async () => {
        return await team.getAll();
    },
    getById: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data.id) throw { code: 400, msg: "ID is required" };
        return await team.getById(data.id);
    }
}

module.exports = model;