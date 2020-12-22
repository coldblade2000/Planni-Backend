var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {CourseModel} = require('../MongoDB/models/models.ts')

const {Course} =  require('../model/Course.ts'); //<----ERROR HERE
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

        const courses  = await Model.retrieveMultipleCourses(query)
        for (let course of courses)
            console.log(course.toString())
        res.json(query)
    }
    /*const id = req.params.identifier
    const query = await CourseModel.find({"courseIdentifier": id}).exec()
    console.log(query)
    res.json(query);*/
});

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

module.exports = router;
