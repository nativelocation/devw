const db = require('../config/mongoose');

module.exports = {
    create: async data => {
        const { firstName, lastName, email, role, password } = data;
        const item = new db.User({ firstName, lastName, email, role, password });
        return await item.save();
    },
    update: async (id, data) => {
        const { firstName, lastName, email, role, password } = data;
        await db.User.findByIdAndUpdate(id, { firstName, lastName, email, role, password });
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