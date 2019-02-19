const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = {
	name: {
		first: String,
		last: String,
	},
	password: String,
	email: String,
	books: [String],
	tasks: [
		{
			title: String,
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
		}
	]
}

const User = module.exports = mongoose.model('User', UserSchema)

const generatePassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

module.exports.register = async (form) => {
	const user = new User({
		['name.first']: form.name.first,
		['name.last']: form.name.last,
		password: await generatePassword(form.password),
		email: form.email,
		books: []
	});

	return await user.save();
}

module.exports.comparePassword = async (password, hash) => {
	return await bcrypt.compare(password, hash);
}