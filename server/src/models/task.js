const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	title: String,
	user: String,
	description: {
		type: String,
		default: ''
	},
	completed: {
		type: Boolean,
		default: false
	},
	dueDate: Date,
	createDate: {
		type: Date,
		default: Date.now
	},

})

const Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.create = async (session, form) => {
	const task = new Task({
		title: form.title,
		completed: false,
	})

	return await task.save();
}