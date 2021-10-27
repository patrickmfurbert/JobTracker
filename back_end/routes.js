const bcrypt = require("bcrypt");
const express = require("express");
const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");
const {users} = require("./models");
const {jobapps} = require("./models");
const router = express.Router();
// signup route
router.post("/auth/signup", async (req, res) => {

    if (!(req.body.email && req.body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }

    // createing a new mongoose doc from user data
    const user = new users({
        email: req.body.email,
        password: req.body.password
    });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));

    });

// login route
router.post("/auth/login", async (req, res) => {

    if (!(req.body.email && req.body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }

    const user = await users.findOne({ email: req.body.email });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
        res.status(200).json({ message: "Valid password" });
        } else {
        res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
});

// create application 
router.post("/jobapps", async (req, res) => {
    if (!(req.body.user_id && req.body.company && req.body.role && req.body.application_date && req.body.location && req.body.description)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }

    // creating a new mongoose doc from app data
    const jobapp = new jobapps({
        user_id: req.body.user_id,
        company: req.body.company,
        role: req.body.role,
        application_date: req.body.application_date,
        location: req.body.location, 
        description: req.body.description
    });

    jobapp.save()
        .then((result) => res.status(201).send(result));
});

// get all applications by user id 
router.get('/users/:uid/jobapps', function(req, res) {
    jobapps.find({user_id: req.params.uid})
        .then((result) => {
            if (result.length !== 0) {
                res.status(200).send(result);
            }
            else {
                res.status(404).json({ "error": "user_id does not exist"});
            }
        });
});

// get specific job application (not specifying user as one jobapp can belong to only one user)
router.get('/jobapps/:jobapp_id', function(req, res) {
    jobapps.findById(req.params.jobapp_id)
        .then((result) => {
            if(result !== null) {
                res.status(200).send(result);
            }
            else {
                res.status(404).json({ "error": "jobapp_id does not exist" });
            }
        }, error => {
            res.status(404).json({ "error": "jobapp_id does not exist" });
        });
})

// delete a jobapp 
router.delete('/jobapps/:jobapp_id', function(req,res) {
    jobapps.findByIdAndDelete(req.params.jobapp_id)
        .then((result) => {
            res.status(204).end()
        }, error => {
            res.status(404).json({ "error": "jobapp_id does not exist" });
        });

});

// modify jobapp 
router.put('/jobapps/:jobapp_id', function(req,res) {
    if (!(req.body.user_id && req.body.company && req.body.role && req.body.application_date && req.body.location && req.body.description)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }

    // verify job exists , 404 if not
    jobapps.findById(req.params.jobapp_id)
    .then((result) => {
        // get the job, setup the update 
        const job = jobapps.findById(req.params.jobapp_id)
        .then((result_1) => {
            const update = {
                user_id: req.body.user_id,
                company: req.body.company,
                role: req.body.role,
                application_date: req.body.application_date,
                location: req.body.location, 
                description: req.body.description
            }

            // confirmed jobid, make the update
            jobapps.findOneAndUpdate(job, update)
                .then((result_2) => {
                    //output of findOneAndUpdate is last record, 
                    // so call findById to get record after update
                    jobapps.findById(req.params.jobapp_id)
                    .then((job) => {
                        res.status(201).send(job);
                    });
                });

        });
    }, error => {
        res.status(404).json({ "error": "jobapp_id does not exist" });
    });



});

module.exports = router;