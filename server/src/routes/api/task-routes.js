const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller')


// get tasks by id
router.get('/:id', (req, res) => {
	taskController.getAllTasks(req, res);
});

// add tasks
router.put('/:id', (req, res) => {
	taskController.addTask(req, res);
});

// delete tasks
router.delete('/:id/:task', (req, res) => {
	taskController.deleteTask(req, res);
});

// delete all tasks
router.delete('/:id', (req, res) => {
	taskController.deleteAllTasks(req, res);
});

// update tasks
router.post('/:id/:task', (req, res) => {
	taskController.updateTask(req, res);
});

module.exports = router;