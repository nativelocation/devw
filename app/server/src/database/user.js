const db = require('../config/mongoose');

module.exports = {
    create: async data => {
        const { teamId, phone, name, email, type, password } = data;
        const item = new db.User({ teamId, phone, name, email, type, password });
        return await item.save();
    },
    update: async (id, data) => {
        const { teamId, phone, name, type, password } = data;
        await db.User.findByIdAndUpdate(id, { teamId, phone, name, type, password });
        return await db.User.findById(id);
    },
    delete: async id => {
        return await db.User.findByIdAndRemove(id);
    },

    getByEmail: async email => {
        return await db.User.findOne({ email });
    },
    getById: async id => {
        return await db.User.findById(id);
    },
    getAll: async () => {
        return await db.User.find();
    }
}