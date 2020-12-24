var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {CourseModel} = require('../MongoDB/models/models')
import * as Model from '../model/model'
const {Course} =  require('../model/Course'); //<----ERROR HERE
//const {retrieveMultipleCourses} = require('../model/model.ts')

mongoose.connect('mongodb://localhost:27017/banner', {useNewUrlParser: true, useUnifiedTopology: true});
/* GET users listing. */
router.get('/', async function (req, res, next) {
    if (isEmpty(req.body)) {
        res.status(400)
        res.send("Can't access the full list of courses")
    } else {
        const query = await CourseModel.find(req.body).exec();
        console.log(query)


        res.json(query)
    }

});

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

module.exports = router;
