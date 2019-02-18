const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

router.post('/signUp', (req, res) => {
	console.log('in')
	UserController.signUp(req, res);
})

router.post('/signIn', (req, res) => {
	UserController.signIn(req, res);
})

router.post('/signOut/:id', (req, res) => {
	UserController.signOut(req, res);
})

module.exports = router;