const bcrypt = require("bcrypt");
const express = require("express");
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
router.post("/application", async (req, res) => {
    if (!(req.body.email && req.body.company && req.body.role && req.body.application_date && req.body.location && req.body.description)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    // createing a new mongoose doc from app data
    const jobapp = new jobapps({
        email: req.body.email,
        company: req.body.company,
        role: req.body.role,
        application_date: req.body.application_date,
        location: req.body.location, 
        description: req.body.description
    });

    jobapp.save()
        .then((result) => res.status(201).send(result));
});

// get all applications 

// get application by id 

// modify application 

// delete application 

module.exports = router;