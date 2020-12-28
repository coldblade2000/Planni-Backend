var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {CourseModel} = require('../MongoDB/models/models')
import * as Model from '../model/model'

const {Course} = require('../model/Course'); //<----ERROR HERE
//const {retrieveMultipleCourses} = require('../model/model.ts')


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
router.get('/:id', async function (req, res) {
    const query = await CourseModel.findOne({courseIdentifier: req.params.id}).exec()
    res.send(query)
})

module.exports = router;
