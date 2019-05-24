const goal = require("../database/goal");
const user = require("../database/user");
const moment = require("moment");
//{ userId, task, taskDate, checked, isDelete, created_at, updated_at }
const model = {
	create: async data => {
		console.log('CREATE DATA: ', data);
		if (!data) throw { code: 400, msg: "Data is required" };
		if (!data.userId) throw { code: 400, msg: "Id is required" };
		if (!data.task) throw { code: 400, msg: "Task is required" };
		if (!data.taskDate) throw { code: 400, msg: "Date is required" };
		// if (!data.priority && data.priority !== 0) throw { code: 400, msg: "Priority is required" };
		//if (!data.priority) throw { code: 400, msg: 'Priority is required'}
		if (!data.orderList) throw { code: 400, msg: 'Order is required'}
		data.checked = false;
		data.isDelete = false;
		data.created_at = moment.utc().format();
		data.updated_at = moment.utc().format();
		return await goal.create(data);
	},
	update: async data => {
		if (!data) throw { code: 400, msg: "Data is required" };
		if (!data._id) throw { code: 400, msg: "Id is required" };
		if (data.checked === undefined) throw { code: 400, msg: "Checked is required" };
		data.updated_at = moment.utc().format();
		return await goal.update(data._id, data.checked, data.updated_at);
	},
	updateDate: async data => {
		console.log("UPDATEDATE -DATA: ",data);
		if (!data) throw { code: 400, msg: "Data is required" };
		if (!data.ids) throw { code: 400, msg: "Ids are required" };
		if (data.taskDate === undefined) throw { code: 400, msg: "Task Date is required" };
		data.updated_at = moment.utc().format();
		let result = await goal.getByIdByDate(data.taskDate, data.userId);
		console.log(result.length);
		data.orderListData.length !== 0 && (await goal.updatePriority(data.userId, data.orderListData, data.updated_at));
		return await goal.updateDate(data.ids, data.taskDate, result.length, data.updated_at);
	},
	updatePriority: async data => {
		console.log("UPDATE PRIORITY - DATA: ", data);
		if (!data) throw { code: 400, msg: "Data is required" };
		if (!data._id) throw { code: 400, msg: "Id is required" };
		if (data.data === undefined) throw { code: 400, msg: "Data is required" };
		data.updated_at = moment.utc().format();
		return await goal.updatePriority(data._id, data.data, data.updated_at);
	},
	logicDelete: async data => {
		if (!data) throw { code: 400, msg: "Data is required" };
		if (!data._id) throw { code: 400, msg: "Id is required" };
		data.isDelete = true;
		data.updated_at = moment.utc().format();
		return await goal.loginDelete(data._id, data.priorityData, data.isDelete, data.updated_at);
	},
	delete: async data => {
		if (!data) throw { code: 400, msg: "Params is empty" };
		if (!data._id) throw { code: 400, msg: "ID is required" };
		return await goal.delete(data._id);
	},
	getAll: async () => {
		return await goal.getAll();
	},
	getByDate: async data => {
		if (!data.date) throw { code: 400, msg: "Date is required" };
		const goals = await goal.getByDate(data.date);
		return goals;
	},
	getByPriority: async data => {
		console.log("GET PRI - DATA: ", data);
		if (!data.date) throw { code: 400, msg: "Date is required" };
		const goals = await goal.getByPriority(data.date);
		return goals;
	},
	getById: async data => {
		if (!data) throw { code: 400, msg: "Data is empty" };
		if (!data._id) throw { code: 400, msg: "ID is required" };
		return await goal.getById(data._id);
	}
};

module.exports = model;
