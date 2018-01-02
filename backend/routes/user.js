var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var userController = require("../controllers/userController");
var User = require('../models/user');


router.post('/register', userController.register);
router.post('/login', userController.login);
//router.get('/all', userController.all);


router.get('/confirmation/:token', userController.confirmation);
router.post('/resend', userController.resendToken);






module.exports = router;