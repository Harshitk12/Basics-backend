const express = require('express');

const router = express.Router();
const {
  getTasks,
  addTask,
  deleteTask,
  toggleDone,
  uploadImg
} = require('../controllers/taskController');

const {upload} =require('../middleware/upload');

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/', deleteTask);
router.patch('/done', toggleDone);

router.post('/upload',upload.single('file'),  uploadImg);

module.exports = router;
