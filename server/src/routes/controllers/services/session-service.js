const User = require('../../../models/user');
const Session = require('../../../models/session');

exports.resolve = async (id) => {
	try{
		const session = await Session.findById(id);

		if(!session)
			throw new Error()

		console.log('session found');
		return await User.findById(session.user);

	}catch(e) {
		console.log('error when resolving session');
		return null;
	}
}