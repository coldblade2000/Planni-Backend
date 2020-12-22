import * as mongoose from "mongoose";
const CourseModel  = require("../MongoDB/models/models").require;
const {CourseClass} = require("./Course")
import {User, Block, Plan}  from "./ObjectFamily"

mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

async function retrieveMultipleCourses(query: Object) : Promise<Array<CourseClass>>{
    let results : Array<mongoose.Document> ;
    results = await CourseModel.find(query).exec();
    return convertRawCoursesToCourses(results);
}

function createUser(user: User){

}

function convertRawCoursesToCourses (resultArray: Array<mongoose.Document>) :Array<CourseClass>{
    const output: Array<CourseClass> = [];
    for(let doc of resultArray){
        output.push(new CourseClass(doc))
        //console.log(doc)
    }
    return output;
}

module.exports.retrieveMultipleCourses = retrieveMultipleCourses
