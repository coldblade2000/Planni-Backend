var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {CourseModel} = require('../MongoDB/models/models')
import * as Model from '../model/model'
const {Course} =  require('../model/Course'); //<----ERROR HERE
//const {retrieveMultipleCourses} = require('../model/model.ts')

//http://localhost:3001/plan/?q={"ids:["5feca60b5d001d493c1d2d17", "5feca82e5d001d493c1d2d19"]}
/* GET users listing. */
router.get('/', async function (req, res, next) {
    if (isEmpty(req.query)) {
        res.status(400)
        res.send("Can't access the full list of courses")
    } else {
        //console.log(req.query)
        const queryObj = JSON.parse(req.query.q)
        if (isEmpty(queryObj)) res.status(400).send("Can't access the full list of courses")

        console.log(queryObj)
        const query = await CourseModel.find(queryObj).exec();
        console.log(query)


        res.status(200).json(query)
    }

});
router.get('/:id', async function (req, res) {
    const query = await CourseModel.find({courseIdentifier: req.params.id}).exec()
    res.send(query)
})

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

module.exports = router;
