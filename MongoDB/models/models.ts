import * as mongoose from 'mongoose'
import {Document} from "mongoose";
import {Days, Meeting, Professor} from "../../model/Course";
import {Block} from "../../model/ObjectFamily";

// const mongoose =  require("mongoose")
const courseSchema: mongoose.Schema = new mongoose.Schema({
    "CRN": Number, //40234
    "term": Number, //202020
    "subjectShort": String, //BIOL
    "courseNumber": String, //1105 de ISIS-1105
    "subjectLong": String, //BIOLOGIA
    "sectionNumber": Number,
    "campusDescription": String, //VIRTUAL , LABORATORIO
    "scheduleTypeDescription": String, //TEORICA , PROYECTO DE GRADO
    "courseTitle": String, //ESTRUCTURAS DE DATOS
    "maximumSeats": Number, //50
    "currentSeats": Number, //0
    "emptySeats": Number, //50
    "credits": Number, //3, 2, 1
    "openSection": Boolean, //true
    "courseIdentifier": String, //BIOL1105
    faculty: [{ //ADMI1101 para encontrar ejemplo
        bannerId: String,
        displayName:String,
        email:String,
        isPrimary:Boolean
    }],
    meetings: [{
        beginTime:String,
        endTime:String,
        building:String, //buildingDescription, Bloque C
        campus: String, //P, V
        startDate:String,
        endDate:String,
        activeDays:{
            monday:Boolean,
            tuesday:Boolean,
            wednesday:Boolean,
            thursday:Boolean,
            friday:Boolean,
            saturday:Boolean,
            sunday:Boolean
        }
    }],
    totalActiveDays:{
        monday:Boolean,
        tuesday:Boolean,
        wednesday:Boolean,
        thursday:Boolean,
        friday:Boolean,
        saturday:Boolean,
        sunday:Boolean
    }
});

export interface ICourse extends Document{
    "CRN": number; //40234
    "term": number; //202020
    "subjectShort": string; //BIOL
    "courseNumber": string; //1105 de ISIS-1105
    "subjectLong": string; //BIOLOGIA
    "sectionNumber": number;
    "campusDescription": string; //VIRTUAL ; LABORATORIO
    "scheduleTypeDescription": string; //TEORICA ; PROYECTO DE GRADO
    "courseTitle": string; //ESTRUCTURAS DE DATOS
    "maximumSeats": number; //50
    "currentSeats": number; //0
    "emptySeats": number; //50
    "credits": number; //3; 2; 1
    "openSection": boolean; //true
    "courseIdentifier": string; //BIOL1105
    faculty: Professor[];
    meetings: Meeting[];
    totalActiveDays: Days;
}

export interface IUser extends Document {
    "email": string,
    googleId: string,
    "planIDs": Array<mongoose.ObjectId>
}

const userSchema = new mongoose.Schema({
    "_id": String,
    "email": {type: String, required: true, unique: true},
    "realName": {type: String, required: false, unique: false},
    "planIDs": [{type: mongoose.Schema.Types.ObjectId, required: true, default: []}],
    googleId: {type: String}

});

export interface IPlanLight {
    name: string;
    owner: string;
    sharedusers: Array<string>;
    courseList: Array<ICourse>;
    blockList: Array<Block>;
}

export interface IPlan extends Document {
    name: string;
    owner: string;
    sharedusers: Array<string>;
    courseList: Array<ICourse>;
    blockList: Array<Block>;
}

const planSchema = new mongoose.Schema({
    name: {type: String, required: true},
    courseList: [{type: mongoose.Schema.Types.ObjectId, required: true, default: []}],
    owner: {type: String, required: true},
    sharedusers: [String],
    blockList: [
        {
            type: new mongoose.Schema({
                isWhitespace: Boolean,
                startTime: String,
                endTime: String
            }),
            default: []
        }
    ]
})
export const CourseModel: mongoose.Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema)

export const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema)
export const Plan: mongoose.Model<IPlan> = mongoose.model<IPlan>('Plan', planSchema)

