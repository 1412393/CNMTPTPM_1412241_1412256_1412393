var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var userController = require("../controllers/userController");
var User = require('../models/user');


router.post('/signup', userController.register);
router.post('/signin', userController.login);
router.post('/islogged',userController.islogged);
router.post('/signout',userController.signout)
//router.get('/all', userController.all);


router.get('/confirmation/:token', userController.confirmation);
router.post('/resend', userController.resendToken);
router.post('/update', userController.updateData);





module.exports = router;