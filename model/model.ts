// import * as mongoose from "mongoose";
const mongoose = require('mongoose')

const CourseModel  = require("../MongoDB/models/models").require;
const {CourseClass} = require("./Course")
import {User, Block, Plan}  from "./ObjectFamily"

mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

async function retrieveMultipleCourses(query: Object) : Promise<Array<typeof CourseClass>>{
    let results;
    results = await CourseModel.find(query).exec();
    return convertRawCoursesToCourses(results);
}

function createUser(user: User){

}

function convertRawCoursesToCourses (resultArray) :Array<typeof CourseClass>{
    const output: Array<typeof CourseClass> = [];
    for(let doc of resultArray){
        output.push(new CourseClass(doc))
        //console.log(doc)
    }
    return output;
}

module.exports.retrieveMultipleCourses = retrieveMultipleCourses
