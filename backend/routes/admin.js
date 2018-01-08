var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var adminController = require("../controllers/adminController");
var User = require('../models/user');

function requireAdmin() {
    return function(req, res, next) {
        User.findOne({ email: req.body.content.email}, function(err, user) {
            if (err) { return next(err); }

            if (!user) {
                res.json({ msg: "not a user" });
            }

            if (user.roles != "admin") {
                res.json({ msg: "not a admin" });
            }

            // pass middleware check admin
            next();
        });
    }
}

router.get('/manage', adminController.manage);


module.exports = router;