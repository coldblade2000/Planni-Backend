// import * as mongoose from "mongoose";
// const mongoose = require('mongoose')

const {CourseModel}  = require("../MongoDB/models/models");
import {ICourse} from "../MongoDB/models/models"
import {User, Block, Plan}  from "./ObjectFamily"

//mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

async function retrieveMultipleCourses(query: Object) : Promise<Array<ICourse>>{
    let results;
    results = await CourseModel.find(query).exec();
    return results;
}

function createUser(user: User){

}

/*function convertRawCoursesToCourses (resultArray) :Array<ICourse>{
    const output: Array<ICourse> = [];
    for(let doc of resultArray){
        output.push(new CourseClass(doc))
        //console.log(doc)
    }
    return output;
}*/

module.exports.retrieveMultipleCourses = retrieveMultipleCourses
