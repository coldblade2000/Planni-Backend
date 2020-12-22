const mongoose =  require("mongoose")

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
const userSchema = new mongoose.Schema({
   "username" : String,

});

module.exports.CourseModel = mongoose.model('Course', courseSchema)
