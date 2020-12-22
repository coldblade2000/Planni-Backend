import {ICourse} from "../MongoDB/models/models";

export class User {
    username: string;
    plans: Array<Plan>;

    constructor(username:string) {
        this.username = username
        this.plans = []
    }

    addPlan(plan){
        this.plans.push(plan);
    }
}

export class Plan {
    name: string;

    courseList : Array<ICourse>;
    blockList : Array<Block>;
}

export class Block{
    isWhitespace : boolean;
    startTime: string;
    endTime: string;
}

/*


const createUser = (username)=>({
    username,
    plans:[],
    addPlan (plan) {this.plans.push(plan)},
    removePlan() {}
})

const createPlan = (name, ) =>({


})
 */