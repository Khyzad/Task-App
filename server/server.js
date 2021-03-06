const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const session = require('express-session');
const validator = require('express-validator');
const cors = require('cors');

const app = express();

mongoose.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Mongodb connected...'))
	.catch(e => console.log(e))

// declare routes
const userRoutes = require('./src/routes/api/user-routes');
const taskRoutes = require('./src/routes/api/task-routes');

// apply parsers to app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	saveUnitialized: true,
	resave: true
}))
app.use(validator({
	errorFormatter: (param, msg, value) => {
		 const namespace = param.split('.'),
			  root = namespace.shift(0),
			  formParam = root;

		 while (namespace.length) {
			  formParam += '[' + namespace.shift() + ']';
		 }

		 return {
			  param: formParam,
			  msg: msg,
			  value: value
		 };
	}
}));

app.use(cors());

// apply routes to app
app.use('/api/user', userRoutes)
app.use('/api/task', taskRoutes)

// set up port
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
})