import * as mongoose from 'mongoose'
import {ICourse} from "../MongoDB/models/models";


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

