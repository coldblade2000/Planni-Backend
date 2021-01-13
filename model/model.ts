import * as mongoose from "mongoose";
import {ICourse, IPlan, Plan, User} from "../MongoDB/models/models"
// const mongoose = require('mongoose')

const {CourseModel} = require("../MongoDB/models/models");
//TODO standardize when you use .exec() and when not
//mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

async function retrieveMultipleCourses(query: Object): Promise<Array<ICourse>> {
    let results;
    results = await CourseModel.find(query).exec();
    return results;
}

export const findUserByID = async (id) => {
    return User.findById(id).exec();
}

export function retrieveOnePlan(planID: mongoose.Types.ObjectId) {
    return Plan.findById(planID).exec();
}

export async function addPlanToUser(name: string, owner: string) {
    const plan = await new Plan({
        name: name,
        owner: owner
    }).save()
    const user = await User.findById(owner)
    user.planIDs.push(plan._id)
    await user.save()
    return plan
}

export function retrieveManyPlans(planIDs: Array<mongoose.Types.ObjectId>) {
    //const planIDs = convertStringIDs(rawplanIDs)
    return Plan.find().where('_id').in(planIDs)
}

export function convertStringIDs(rawIds: Array<string>): Array<mongoose.Types.ObjectId> {
    const procPlanIDs: Array<mongoose.Types.ObjectId> = [];
    rawIds.forEach((id) => procPlanIDs.push(mongoose.Types.ObjectId(id)))
    return procPlanIDs;
}

export function checkPlanAuthorization(plan: IPlan, userID: string): boolean {
    if (!plan) return false;
    if (plan.owner === userID) return true;
    return !!plan.sharedusers.includes(userID);

}

export function updatePlan(planID: mongoose.Types.ObjectId, plan: IPlan) {
    return Plan.replaceOne({_id: planID}, plan)
}

export function isObjEmpty(obj): boolean {
    for (let x in obj) return false
    return true
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
