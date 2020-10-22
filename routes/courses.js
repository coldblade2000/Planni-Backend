var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Course = require('../MongoDB/models/models')
mongoose.connect('mongodb://localhost:27017/banner', {useNewUrlParser: true, useUnifiedTopology: true});

/* GET users listing. */
router.get('/', async function (req, res, next) {
    if (isEmpty(req.body)) {
        res.status(400)
        res.send("Can't access the full list of courses")
    } else {
        const query = await Course.find(req.body).exec();
        console.log(query)
    }
    const id = req.params.identifier
    const query = await Course.find({"courseIdentifier": id}).exec()
    console.log(query)
    res.json(query);
});

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

module.exports = router;
