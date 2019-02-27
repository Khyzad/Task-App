const Task = require('../../models/task');
const SessionService = require('./services/session-service');

exports.getAllTasks = async (req, res) => {
	console.log('in get all tasks');
	try {
		if (!req.params.id)
			res.status(400).json({ error: 'user session required' });

		const user = await SessionService.resolve(req.params.id);

		res.status(200).json({ tasks: user.tasks.map(task => { return task }) });
	} catch (e) {
		res.status(400).json({});
	}
};

exports.addTask = async (req, res) => {
	console.log('in add Task')
	try {
		if (!req.params.id)
			res.status(400).json({ error: 'user session required' });
		if (!req.body.title)
			res.status(400).json({ error: 'title required' });

		const user = await SessionService.resolve(req.params.id);
		console.log('found user')
		if (user) {
			user.tasks.push({
				title: req.body.title,
				description: req.body.description
			})

			await user.save();

			console.log(user);
			res.status(201).json({task: user.tasks[user.tasks.length - 1]})
		}

	} catch (e) {
		res.status(400).json({});
	}
};

exports.deleteTask = async (req, res) => {
	try {
		if (!req.params.id)
			res.status(400).json({ error: 'user session required' });

		const user = await SessionService.resolve(req.params.id);
		console.log('task = ' + req.params.task);
		if (user) {
			user.tasks = user.tasks.filter(task => {
				if (req.params.task != task._id) return task
			});

			await user.save();

			res.status(200).json({})
		}

	} catch (e) {
		res.status(400).json({});
	}
};

exports.deleteAllTasks = async (req, res) => {
	try {
		if (!req.params.id)
			res.status(400).json({ error: 'user session required' });

		const user = await SessionService.resolve(req.params.id);

		if (user) {
			user.tasks = [];
			await user.save();

			res.status(200).json({})
		}

	} catch (e) {
		res.status(400).json({});
	}
};

exports.updateTask = async (req, res) => {
	try {
		if (!req.params.id)
			res.status(400).json({ error: 'user session required' });

		const user = await SessionService.resolve(req.params.id);

		if (user) {
			user.tasks = user.tasks.map(task => {
				if(task._id == req.params.task){
					task.title = req.body.title;
					task.completed = req.body.completed;
					task.description = req.body.description;
				}
				return task;
			});
			await user.save();

			res.status(200).json({})
		}

	} catch (e) {
		res.status(400).json({});
	}
};