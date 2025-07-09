const express = require('express');
const router = express.Router();
const {
  getTasks,
  addTask,
  deleteTask,
  toggleDone
} = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/', deleteTask);
router.patch('/done', toggleDone);

module.exports = router;
