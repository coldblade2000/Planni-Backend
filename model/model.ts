import * as mongoose from "mongoose";
import {ICourse, IPlan, Plan, User} from "../MongoDB/models/models"
// const mongoose = require('mongoose')

const {CourseModel} = require("../MongoDB/models/models");
//TODO standardize when you use .exec() and when not
//mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

const userPopConfig = {
    path:"planIDs",
    populate:{
        path:"courseList"
    }
}

async function retrieveMultipleCourses(query: Object): Promise<Array<ICourse>> {
    let results;
    results = await CourseModel.find(query).exec();
    return results;
}

export const findUserByID = async (id) => {
    
    return User.findById(id).populate(userPopConfig).exec();
}

export function retrieveOnePlan(planID: mongoose.Types.ObjectId) {
    return Plan.findById(planID).populate("courseList").exec();
}

export async function addPlanToUser(name: string, owner: string) {
    const plan = await new Plan({
        name: name,
        owner: owner
    }).save()
    const user = await User.findById(owner).populate(userPopConfig).exec()
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
    const depopPlans = depopulatePlan(plan)
    return Plan.replaceOne({_id: planID}, depopPlans)
}

export function isObjEmpty(obj): boolean {
    for (let x in obj) return false
    return true
}

const depopulatePlan = (plan)=>{
    const depPlan = {
        name: plan.name,
        owner: plan.owner,
        _id: plan._id,
        blockList: plan.blockList,
        courseList: [],
        sharedusers: [],
    }
    const newCourseList = []
    for(let course of plan.courseList){
        if(typeof course === "string"){
            newCourseList.push(parseInt(course))
        }
        if(typeof course === "number"){
            newCourseList.push(course)
        }
        if(typeof course === "object" && course._id !== undefined){
            newCourseList.push(course._id)
        }
    }
    depPlan.courseList = newCourseList
    const newsharedusers = []
    for(let user of plan.sharedusers){
        if(typeof user === "string"){
            newsharedusers.push(user)
        }
        if(typeof user === "object" && user._id !== undefined){
            newsharedusers.push(user._id)
        }
    }
    depPlan.sharedusers = newsharedusers
    return depPlan
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
