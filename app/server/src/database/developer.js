const db = require('../config/mongoose');

module.exports = {
    create: async data => {
        const { firstName, lastName, apiId, status, type } = data;
        const item = new db.Developer({ firstName, lastName, apiId, status, type });
        return await item.save();
    },
    update: async (id, data) => {
        const { firstName, lastName, apiId, status, type } = data;
        await db.Developer.findByIdAndUpdate(id, { firstName, lastName, apiId, status, type });
        return await db.Developer.findById(id);
    },
    delete: async id => {
        return await db.Developer.findByIdAndRemove(id);
    },

    getByApiId: async apiId => {
        return await db.Developer.findOne({ apiId });
    },
    getById: async id => {
        return await db.Developer.findById(id);
    },
    getAll: async () => {
        return await db.Developer.find();
    }
}