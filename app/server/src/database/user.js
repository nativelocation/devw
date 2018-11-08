const db = require('../config/mongoose');

module.exports = {
    create: async data => {
        const { teamId, phone, name, email, type, password } = data;
        const values = { teamId, phone, name, email, type, password };
        const item = new db.User(values);
        return await item.save();
    },
    update: async (id, data) => {
        const user = await db.User.findByIdAndUpdate({ _id: id }, data);
        return await db.User.findById(user._id);
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