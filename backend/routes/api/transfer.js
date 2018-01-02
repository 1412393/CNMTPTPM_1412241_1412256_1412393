var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var transferController = require("../../controllers/transferController");
var User = require('../../models/user');


router.post('/new', transferController.new);
router.get('/all', transferController.all);





module.exports = router;