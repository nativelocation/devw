const developer = require('../database/developer');

const bcrypt = require('bcryptjs');

const model = {
    create: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.apiId) throw { code: 400, msg: "API ID is required" };
        if (!data.status) throw { code: 400, msg: "Status is required" };
        if (!data.type) throw { code: 400, msg: "Type is required" };
        
        const existDeveloper = await developer.getByEmail(data.apiId);
        if (existDeveloper) throw { code: 400, msg: "The developer already exists" };

        return await developer.create(data);
    },
    update: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.id) throw { code: 400, msg: "Id is required" };
        if (!data.apiId) throw { code: 400, msg: "API ID is required" };

        const existUser = await user.getById(data.id);
        if (!existUser) throw { code: 400, msg: "The user doesn't exists" };

        return await user.update(data.id, data);
    },
    delete: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await user.delete(data._id);
    },
    getAll: async () => {
        return await user.getAll();
    },
    getById: async data => {
        if (!data) throw { code: 400, msg: "Data is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await user.getById(data._id);
    },
    getByToken: async data => {
        if (!data) throw { code: 400, msg: "Data is empty" };
        if (!data.user_id) throw { code: 400, msg: "Id is required" };
        return await user.getById(data.user_id);
    }
}

module.exports = model;