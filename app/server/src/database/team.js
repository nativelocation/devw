const db = require('../config/mongoose');
const database = {
    create: async data => {
        const { name } = data;
        const values = { name };
        const item = new db.Team(values);
        return await item.save();
    },
    update: async (data) => {
        const { _id, name } = data;
        return await db.Team.findByIdAndUpdate(_id, { name });
    },
    delete: async id => {
        return await db.Team.findByIdAndRemove(id);
    },
    getById: async id => {
        return await db.Team.findById(id);
    },
    getAll: async () => {
        return await db.Team.find();
    }
}

module.exports = database;