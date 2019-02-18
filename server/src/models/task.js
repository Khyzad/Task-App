const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
	title: String,
	completed: Boolean,
	dueDate: Date,
	description: String,
})

const Task = module.exports = mongoose.model('Task', TaskSchema);

