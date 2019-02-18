const mongoose = require('mongoose');

const SessionSchema = {
	user: String,
}

const Session = module.exports = mongoose.model('Session', SessionSchema);

module.exports.create = async (user) => {
	const session = new Session({ user: user });
	return await session.save();
}