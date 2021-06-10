var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("Log user: ", req.user)
    res.render('index', {title: 'Express'});
});

module.exports = router;
