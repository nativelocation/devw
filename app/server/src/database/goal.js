const db = require('../config/mongoose');
const _ = require("lodash");

module.exports = {
    create: async data => {
        const { userId, task, taskDate, checked, isDelete, created_at, updated_at, priority, orderList } = data;
        const item = new db.Goals({ userId, task, taskDate, checked, isDelete, created_at, updated_at, priority, orderList });
        return await item.save();
    },
    update: async (id, data) => {
        await db.Goals.findByIdAndUpdate(id, _.omitBy(data, _.isNil));
        return await db.Goals.findById(id);
    },
    updatePriority: async (id, data, updated_at) => {
		await data.map(async e => {
			await db.Goals.findByIdAndUpdate(e._id, { orderList: e.orderList, updated_at });
		});

		return await db.Goals.findById(data[0]._id);
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
    getByPriority: async taskDate => {
		return await db.Goals.find({ taskDate, isDelete: false }).sort({ orderList: "asc" });
	},
    getByDate: async taskDate => {
        return await db.Goals.find({ taskDate, isDelete: false });
    }
}