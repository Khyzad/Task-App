const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = {
	password: String,
	email: String,
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
		password: await generatePassword(form.password),
		email: form.email,
	});

	return await user.save();
}

module.exports.comparePassword = async (password, hash) => {
	return await bcrypt.compare(password, hash);
}