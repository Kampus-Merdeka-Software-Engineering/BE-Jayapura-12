const express = require('express');
const router = express.Router();
const controller = require('./controller/index');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/users', controller.getUsers);
router.get('/contacts', controller.getContacts);
router.post('/register', upload.single('image'), controller.addUsers);
router.post('/login', controller.setUsers);
router.post('/contact-us', controller.setContacts);
router.post('/update', controller.updateProfile);

module.exports = router;