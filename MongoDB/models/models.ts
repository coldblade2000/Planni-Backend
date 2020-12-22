import * as mongoose from 'mongoose'
import {Schema, Document} from "mongoose";
import {Days, Meeting, Professor} from "../../model/Course";

// const mongoose =  require("mongoose")
const courseSchema : Schema = new Schema({
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
    meetings : Meeting[];
    totalActiveDays: Days;
}

const userSchema = new mongoose.Schema({
   "username" : String,

});
module.exports.CourseModel = mongoose.model<ICourse>('Course', courseSchema)
