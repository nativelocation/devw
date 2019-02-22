const db = require('../config/mongoose');

module.exports = {
    create: async data => {
        const { userId, task, taskDate, checked, isDelete, created_at, updated_at } = data;
        const item = new db.Goals({ userId, task, taskDate, checked, isDelete, created_at, updated_at });
        return await item.save();
    },
    update: async (id, data) => {
        const { userId, task, checked, isDelete, created_at, updated_at } = data;
        await db.Goals.findByIdAndUpdate(id, { userId, task, checked, isDelete, created_at, updated_at });
        return await db.Goals.findById(id);
    },
    delete: async id => {
        return await db.Goals.findByIdAndRemove(id);
    },
    getById: async id => {
        return await db.Goals.findById(id);
    },
    getAll: async () => {
        return await db.Goals.find();
    },
    getToday: async taskDate => {
        return await db.Goals.find({taskDate});
    }
}