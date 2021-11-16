const bcrypt = require("bcrypt");
const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const ds = require('./datastore');
const datastore = ds.datastore;

const USERS = "Users";

router.use(bodyParser.json());

/* -------------Begin Model Functions ------------- */

function create_user(email, password) {
    var key = datastore.key(USERS);
    const new_user = { "email": email, "password": password};
    return datastore.save({
        "key": key, 
        "data": new_user 
    }).then(() => { return key });  
}

async function get_all_emails () {
    const query = datastore.createQuery(USERS);
    const [user_list] = await datastore.runQuery(query);
    return user_list.map(ds.fromDatastore);
}

function get_user(user_id) {
    const key = datastore.key([USERS, parseInt(user_id, 10)]);
    return datastore.get(key).then((entity) => {
        if (entity[0] === undefined || entity[0] === null) {
            // not found 
            return entity;
        } else {
            // id found, map attributes from datastore (+ self) to entity 
            return entity.map(ds.fromDatastore);
        }
    });
}

/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

// signup route
router.post("/signup", async (req, res) => {

    if (!(req.body.email && req.body.password)) {
        return res.status(400).send('{ "Error":  "Data not formatted properly" }')
    }
    else {
        var count = 0;
        // verify email not already used 
        get_all_emails()
            .then(async (result) => {
                //var count = 0;
                result.forEach(user => {
                    if (user.email === req.body.email) {
                        count = count + 1;
                    }
                });

                if (count !== 0) {
                    return res.status(403).json('{ "Error": "An account with this email already exists - Please try a new email." }');                    
                }
                else {
                    // email does not exist, continue
                    // generate salt to hash password
                    const salt = await bcrypt.genSalt(10);        
                    // now we set user password to hashed password
                    const hashed_password = await bcrypt.hash(req.body.password, salt);

                    create_user(req.body.email, hashed_password)
                        .then(key => {
                            // print newly created user 
                            get_user(key.id)
                                .then(result2 => {
                                    const [my_user] = result2;
                                    const details = {
                                        id: key.id,
                                        email: my_user.email, 
                                        password: my_user.password
                                    }
                                    return res.status(201).json(details);
                                });
                        });
                }
            });
    }

});

// login route
router.post("/login", async (req, res) => {

    if (!(req.body.email && req.body.password)) {
        return res.status(400).send('{ "Error": "Data not formatted properly" }');
    }
    else {
        // verify email
        var count = 0;
        var uid = "";
        var hashed_password = ""; 
        get_all_emails()
            .then(async (result) => {
                //var count = 0;
                result.forEach(user => {
                    if (user.email === req.body.email) {
                        // user found, now verify password 
                        count = count + 1;
                        hashed_password = user.password;
                        uid = user.id;
                    }
                });

                if (count !== 0) {
                    const validPassword = await bcrypt.compare(req.body.password, hashed_password);
                    if (validPassword) {
                        var response = {
                            id: uid, 
                            state: "Success"
                        };
                        res.status(200).json(response);
                    }
                    else {
                        res.status(400).send('{ "Error": "Email and/or Password is incorrect" }'); 
                    }
                }
                else {
                    res.status(400).send('{ "Error": "Email and/or Password is incorrect" }'); 
                }

            });
    }
});

/* ------------- End Controller Functions ------------- */


module.exports = router;