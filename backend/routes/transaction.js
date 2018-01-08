var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var transactionController = require("../controllers/transactionController");




router.post('/send', transactionController.sendCoin);
router.get('/confirmation/:id', transactionController.Confirmation);
router.get('/cancle/:id', transactionController.Cancle);




module.exports = router;