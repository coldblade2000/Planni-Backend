
class User {
    username: string;
    plans: Array<Plan>;

    constructor(username:string) {
        this.username = username
    }

    addPlan(plan){
        this.plans.push(plan);
    }
}

class Plan {

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