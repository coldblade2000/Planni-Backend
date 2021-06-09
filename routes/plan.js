import {Plan,} from "../MongoDB/models/models";
import {
    addPlanToUser,
    checkPlanAuthorization,
    convertStringIDs,
    isObjEmpty,
    retrieveManyPlans,
    retrieveOnePlan,
    updatePlan
} from "../model/model";
import {Types} from 'mongoose'

const passport = require('passport')

var express = require('express');
var router = express.Router();

router.post('/', passport.authenticate('jwt'), async function (req, res) {
    /**
     * {
     *     name: String
     * }
     */
    if (!req.user) return res.status(401).send("ERROR 401 Not authorized: You're not logged in!")
    if (!req.body) return res.status(400).send("ERROR 400 no request body found!")
    const planIDs = req.user.planIDs
    const records = await Plan.find().where('_id').in(planIDs).exec()
    for (let plan of records) {
        if (plan.name === req.body.name) {
            return res.status(409).send("ERROR 409: Plan name already exists for this user!")
        }
    }
    addPlanToUser(req.body.name, req.user._id).then((plan) => {
        return res.status(201).send(plan)
    })
})

router.get('/', passport.authenticate('jwt'), async function (req, res) {
    /**
     * {
     *     ids: [String]
     * }
     * ObjectId("5feca60b5d001d493c1d2d17"),
     ObjectId("5feca82a5d001d493c1d2d18"),
     ObjectId("5feca82e5d001d493c1d2d19")
     */
    if (!req.user) return res.status(401).send("ERROR 401 Not authorized: You're not logged in!")
    // if (!req.body) return res.status(400).send("ERROR 400 no request body found!")
    let array = null
    if (req.query.ids) array = JSON.parse(req.query.ids)

    const planIDs = (!!array && !isObjEmpty(array)) ? convertStringIDs(array) : req.user.planIDs;
    //const planIDs = req.user.planIDs
    const records = await retrieveManyPlans(planIDs).exec()
    if (!records) return res.status(404).send(`ERROR 404 Not found: No plans were found in the database, for the ID Array ${planIDs}`);
    for (let plan of records) {
        if (!checkPlanAuthorization(plan, req.user._id)) {
            return res.status(201).send(`ERROR 401 Not authorized: ${req.user._id} is not allowed to access 
            the plan called ${plan.name} with ID${plan._id}`)
        }
    }
    res.status(200).send(records)
});

router.get('/:id', passport.authenticate('jwt'), async function (req, res) {
    if (!req.user) return res.status(401).send("ERROR 401 Not authorized: You're not logged in!")
    const plan = await retrieveOnePlan(Types.ObjectId(req.params.id))
    if (plan) {
        if (checkPlanAuthorization(plan, req.user._id)) {
            return res.status(200).send(plan)
        } else {
            return res.status(401).send(`ERROR 401 Not authorized: user ${req.user._id} is not authorized to access the plan with ID ${plan._id} `)
        }
    } else {
        return res.status(404).send(`ERROR 404 Not Found! The plan with ID ${req.params.id} doesn't exist!`);
    }
});

router.put('/:id', passport.authenticate('jwt'), async function (req, res) {
    /**
     * body = replacement plan object
     */
    if (!req.user) return res.status(401).send("ERROR 401 Not authorized: You're not logged in!")
    if (!req.body) return res.status(400).send("ERROR 400 no request body found!")
    const originalPlan = await retrieveOnePlan(Types.ObjectId(req.params.id))
    const newPlan = req.body;
    if (originalPlan) {
        if (!originalPlan._id === newPlan._id) return res.status(400).send(`ERROR 400 Bad Request: Plan ID mismatch!`);
        if (originalPlan.owner === req.user._id) {
            const mongoResponse = await updatePlan(originalPlan._id, newPlan)
            return res.status(200).send(newPlan)
        } else {
            return res.status(401).send(`ERROR 401 Not authorized: user ${req.user._id} is not authorized to access the plan with ID ${plan._id}. They're not the owner! `)
        }
    } else {
        return res.status(404).send(`ERROR 404 Not Found! The plan with ID ${req.params.id} doesn't exist!`);
    }
});

router.delete('/:id', passport.authenticate('jwt'), async function (req, res) {
    if (!req.user) return res.status(401).send("ERROR 401 Not authorized: You're not logged in!")
    const plan = await retrieveOnePlan(Types.ObjectId(req.params.id))
    if (plan) {
        if (plan.owner === req.user._id) {
            return res.status(200).send(plan)
        } else {
            return res.status(401).send(`ERROR 401 Not authorized: user ${req.user._id} is not authorized to access the plan with ID ${plan._id} `)
        }
    } else {
        return res.status(404).send(`ERROR 404 Not Found! The plan with ID ${req.params.id} doesn't exist!`);
    }
});

module.exports = router;
