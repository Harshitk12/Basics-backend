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
const auth=require('../middleware/auth');

router.get('/',auth, getTasks);
router.post('/',auth, addTask);
router.delete('/',auth, deleteTask);
router.patch('/done',auth, toggleDone);

router.post('/upload',auth,upload.single('file'),  uploadImg);

module.exports = router;
