import * as mongoose from "mongoose";
// const mongoose = require('mongoose')

const {CourseModel}  = require("../MongoDB/models/models");
import {ICourse, IPlan, IPlanLight, Plan} from "../MongoDB/models/models"

//mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

async function retrieveMultipleCourses(query: Object): Promise<Array<ICourse>> {
    let results;
    results = await CourseModel.find(query).exec();
    return results;
}

export function retrieveOnePlan(planID: mongoose.Schema.Types.ObjectId) {
    return Plan.findById(planID).exec();
}

export function retrieveManyPlans(planIDs: Array<mongoose.Schema.Types.ObjectId>) {
    return Plan.find().where('_id').in(planIDs)
}

export function checkPlanAuthorization(plan: IPlan, userID: string): boolean {
    if (!plan) return false;
    if (plan.owner === userID) return true;
    return !!plan.sharedusers.includes(userID);

}

export function updatePlan(planID: mongoose.Schema.Types.ObjectId, plan: IPlan) {
    return Plan.replaceOne({_id: planID}, plan)
}

/*function createUser(user: User){

}*/

/*function convertRawCoursesToCourses (resultArray) :Array<ICourse>{
    const output: Array<ICourse> = [];
    for(let doc of resultArray){
        output.push(new CourseClass(doc))
        //console.log(doc)
    }
    return output;
}*/

module.exports.retrieveMultipleCourses = retrieveMultipleCourses
