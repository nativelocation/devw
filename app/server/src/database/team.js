const db = require('../config/mongoose');
const database = {
    create: async data => {
        const { name } = data;
        const values = { name };
        const item = new db.Team(values);
        return await item.save();
    },
    update: async (id, data) => {
        const team = await db.Team.findByIdAndUpdate({_id: id}, data);
        return await db.Team.findById(team._id);
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