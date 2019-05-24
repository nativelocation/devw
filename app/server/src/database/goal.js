const db = require("../config/mongoose");

module.exports = {
	create: async data => {
		const { userId, task, priority, taskDate, checked, isDelete, created_at, updated_at, orderList} = data;
		const item = new db.Goals({ userId, task, priority, taskDate, checked, isDelete, created_at, updated_at, orderList });
		return await item.save();
	},
	update: async (id, checked, updated_at) => {
		await db.Goals.findByIdAndUpdate(id, { checked, updated_at });
		return await db.Goals.findById(id);
	},
	updateDate: async (ids, taskDate, lastOrderList, updated_at) => {
		await ids.map(async (id, idx) => {
			await db.Goals.findByIdAndUpdate(id, {
				taskDate,
				checked: false,
				orderList: lastOrderList + idx,
				updated_at
			});
		});

		return await db.Goals.findById(ids[0]);
	},
	updatePriority: async (id, data, updated_at) => {
		await data.map(async e => {
			await db.Goals.findByIdAndUpdate(e._id, { orderList: e.orderList, updated_at });
		});

		return await db.Goals.findById(data[0]._id);
	},
	loginDelete: async (id, priorityData, isDelete, updated_at) => {
		await db.Goals.findByIdAndUpdate(id, { isDelete, updated_at });
		priorityData.length !== 0 &&
			(await priorityData.map(async e => {
				await db.Goals.findByIdAndUpdate(e._id, { priority: e.priority, updated_at });
			}));
		return await db.Goals.findById(id);
	},
	delete: async (id, priorityData) => {
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
	},
	getByPriority: async taskDate => {
		return await db.Goals.find({ taskDate, isDelete: false }).sort({ priority: "asc" });
	},
	getByIdByDate: async (taskDate, userId) => {
		return await db.Goals.find({ taskDate, userId, isDelete: false });
	}
};
