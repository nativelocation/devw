module.exports = Schema => {
	return new Schema({
		userId: String,
		task: String,
		priority: String,
		taskDate: String,
		checked: Boolean,
		isDelete: Boolean,
		created_at: String,
		updated_at: String,
		orderList: Number
	});
};
