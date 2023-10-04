const express = require('express');
const router = express.Router();
const controller = require('./controller/index');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/users', controller.getUsers);
router.post('/register', upload.single('image'), controller.addUsers);
router.post('/login', controller.setUsers);

module.exports = router;