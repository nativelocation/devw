const db = require('../config/mongoose');

module.exports = {
    create: async data => {
        const { userId, task, taskDate, checked, isDelete, created_at, updated_at, priority } = data;
        const item = new db.Goals({ userId, task, taskDate, checked, isDelete, created_at, updated_at, priority });
        return await item.save();
    },
    update: async (id, data) => {
        await db.Goals.findByIdAndUpdate(id, _.omitBy(data, _.isNil));
        return await db.Goals.findById(id);
    },
    loginDelete: async (id, isDelete, updated_at) => {
        await db.Goals.findByIdAndUpdate(id, { isDelete, updated_at });
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
    getByDate: async taskDate => {
        return await db.Goals.find({ taskDate, isDelete: false });
    }
}