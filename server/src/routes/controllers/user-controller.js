const User = require('../../models/user');
const Session = require('../../models/session');

exports.signUp = async (req, res) => {
	try {
		console.log('attempting to sign up new user')
		console.log(req.body)
		const email = await User.findOne({ email: req.body.email });

		if (email) {
			res.status(406).json({ error: 'Email already in use' });
		} else {
			const user = await User.register(req.body);
			const session = await Session.create(user._id);

			res.status(201).json({
				session: session._id,
				books: user.books
			})
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({error: 'internal error'})
	}
};

exports.signIn = async (req, res) => {
	try {
		console.log('attempting to sign in user')
		console.log(req.body)

		const user = await User.findOne({ email: req.body.email });
		if (user && await User.comparePassword(req.body.password, user.password)) {
			const session = await Session.create(user._id);

			res.status(201).json({
				session: session._id,
				books: user.books
			})
		} else {
			res.status(406).json({ error: 'invalid email/password combination' })
		}

	} catch (e) {
		console.log(e);
	}
};

exports.signOut = (req, res) => {
	console.log('attempting to sign out user')
	console.log(req.params.id)

	Session.findByIdAndDelete(req.params.id)
		.then(session => {
			if (session){
				res.status(200).json({});
			}else{
				res.status(400).json({error: 'Session expired'});
			}
		}).catch(e => {
			console.log(e);
			res.status(500).json({});
		});
};
