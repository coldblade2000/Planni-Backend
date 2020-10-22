export interface Course{
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

export class CourseClass implements Course{
    CRN: number;
    campusDescription: string;
    courseIdentifier: string;
    courseNumber: string;
    courseTitle: string;
    credits: number;
    currentSeats: number;
    emptySeats: number;
    faculty: Professor[];
    maximumSeats: number;
    meetings: Meeting[];
    openSection: boolean;
    scheduleTypeDescription: string;
    sectionNumber: number;
    subjectLong: string;
    subjectShort: string;
    term: number;
    totalActiveDays: Days;

    isDayActive (day: string){
        return this.totalActiveDays[day]
    }
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