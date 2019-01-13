const db = require('../config/mongoose');

module.exports = {
    create: async data => {
        const { apiId, active, fullTime } = data;
        const item = new db.Developer({ apiId, active, fullTime });
        return await item.save();
    },
    update: async data => {
        const { apiId, active, fullTime } = data;
        //await db.Developer.findOneAndUpdate(id, { apiId, active, fullTime });
        return await db.Developer.findOneAndUpdate( apiId,{active, fullTime });
        //return await db.Developer.findById(id);
    },
    delete: async apiId => {
        return await db.Developer.findOneAndDelete({ apiId });
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