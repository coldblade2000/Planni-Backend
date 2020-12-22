import * as mongoose from 'mongoose'
import {ICourse} from "../MongoDB/models/models";
// const mongoose = require('mongoose')

/*
export class CourseClass implements Course{
    CRN: number;
    campusDescription: string;
    courseIdentifier: string;
    courseNumber: string;
    courseTitle: string;
    credits: number;
    currentSeats: number;
    emptySeats: number;
    maximumSeats: number;
    openSection: boolean;
    scheduleTypeDescription: string;
    sectionNumber: number;
    subjectLong: string;
    subjectShort: string;
    term: number;
    faculty: Professor[];
    meetings: Meeting[];
    totalActiveDays: Days;

    //constructor(doc) {
    constructor(doc: mongoose.Document ) {
        this.CRN = doc["CRN"]
        this.campusDescription = doc["campusDescription"]
        this.courseIdentifier = doc["courseIdentifier"]
        this.courseNumber = doc["courseNumber"]
        this.courseTitle = doc["courseTitle"]
        this.credits = doc["credits"]
        this.currentSeats = doc["currentSeats"]
        this.emptySeats = doc["emptySeats"]
        this.maximumSeats = doc["maximumSeats"]
        this.openSection = doc["openSection"]
        this.scheduleTypeDescription = doc["scheduleTypeDescription"]
        this.sectionNumber = doc["sectionNumber"]
        this.subjectLong = doc["subjectLong"]
        this.subjectShort = doc["subjectShort"]
        this.term = doc["term"]
        this.faculty = doc["faculty"]
        this.meetings = doc["meetings"]
        this.totalActiveDays = doc["totalActiveDays"]
    }





}
*/

export function toString(course: ICourse){
    return `${course.CRN} - ${course.courseTitle} - ${course.courseIdentifier} - ${course.credits}`
}
export function isDayActive (course:ICourse, day: string){
    return course.totalActiveDays[day]
}

export interface Professor{
    bannerId: string,
    displayName:string,
    email:string,
    isPrimary:boolean
}
export interface Meeting {
    beginTime:string;
    endTime:string;
    building:string; //buildingDescription; Bloque C
    campus: string; //P; V
    startDate:string;
    endDate:string;
    activeDays : Days;
}
export interface Days{
    monday:boolean;
    tuesday:boolean;
    wednesday:boolean;
    thursday:boolean;
    friday:boolean;
    saturday:boolean;
    sunday:boolean;
}

/*module.exports = {
CourseClass: CourseClass
}*/
/*
const courseSchema = new mongoose.Schema({
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
*/