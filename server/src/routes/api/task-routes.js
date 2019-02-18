const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller')

// get all
router.get('/', (req, res) => {
	res.send('unimplemented')
});

// get book by id
router.get('/:id', (req, res) => {
	res.send('unimplemented')
});

// add book
router.post('/', (req, res) => {
	taskController.addTask(req, res);
});

// delete book
router.delete('/:id', (req, res) => {
	res.send('unimplemented')
});

// update book
router.post('/:id', (req, res) => {
	res.send('unimplemented')
});

module.exports = router;