const document = require('../database/document');

const model = {
    create: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.name) throw { code: 400, msg: "Name is required" };
        if (!data.userId) throw { code: 400, msg: "User is required" };
        if (!data.comments) throw { code: 400, msg: "Comments is required" };
        return await document.create(data);
    },
    update: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.name) throw { code: 400, msg: "Name is required" };
        if (!data.userId) throw { code: 400, msg: "User is required" };
        if (!data.comments) throw { code: 400, msg: "Comments is required" };
        const { name, userId, comments } = data;
        const values = { name: name, userId: userId, comments: comments };
        return await document.update(data._id, values);
    },
    delete: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await document.delete(data._id);
    },
    getAll: async () => {
        return await document.getAll();
    },
    getById: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data.id) throw { code: 400, msg: "ID is required" };
        return await document.getById(data.id);
    }
}

module.exports = model;