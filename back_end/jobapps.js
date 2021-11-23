const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const ds = require('./datastore');
const datastore = ds.datastore;

const USERS = "Users";
const JOBAPPS = "JobApps";


router.use(bodyParser.json());

/* -------------Begin Model Functions ------------- */

function fromDatastore(item){
    item.id = item[datastore.KEY].id;
    return item;
}

function create_jobapp (user_id, company, role, application_date, location, description, skills, contacts) {
    var key = datastore.key(JOBAPPS);
    const new_job = { 
        "user_id": user_id, 
        "company": company,
        "role": role, 
        "application_date": application_date,
        "location": location, 
        "description": description,
        "skills": skills, 
        "contacts": contacts
    };

    return datastore.save({
        "key": key, 
        "data": new_job
    }).then(() => { return key });  
}

async function get_all_jobapps_per_user (user_id) {
    const query = datastore.createQuery(JOBAPPS).filter('user_id','=',user_id);
    //query = query;
    return datastore.runQuery(query).then((entities) => {
        return entities[0].map(fromDatastore);
    });
}


function get_jobapp(jobapp_id) {
    const key = datastore.key([JOBAPPS, parseInt(jobapp_id, 10)]);
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

function modify_jobapp(jobapp_id, user_id, company, role, application_date, location, description, skills, contacts) {
    const key = datastore.key([JOBAPPS, parseInt(jobapp_id, 10)]);
    const modified_job = { 
        "user_id": user_id, 
        "company": company, 
        "role": role, 
        "application_date": application_date, 
        "location": location, 
        "description": description,
        "skills": skills, 
        "contacts": contacts
     };
    return datastore.save({ "key": key, "data": modified_job })
        .then(() => { 
            return key 
        });
}

function delete_jobapp(jobapp_id) {
    const key = datastore.key([JOBAPPS, parseInt(jobapp_id, 10)]);
    return datastore.delete(key).then(() => { return key});
}



/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */

// create application 
router.post("/", async (req, res) => {

    // all fields required besides skills and contacts 
    if (!(req.body.user_id && req.body.company && req.body.role && req.body.application_date && req.body.location && req.body.description)) {
        return res.status(400).send('{ "Error": "Data not formatted properly" }'); 
    }
    else {
        // verify user exists
        get_user(req.body.user_id)
            .then((result) => {
                if (result[0] === undefined || result[0] === null) {
                    // Not found
                    return res.status(404).json({ 'Error': 'No user with this user_id exists' });
                } 
                else {                
                    // create the jobapp
                    create_jobapp(req.body.user_id, req.body.company, req.body.role, req.body.application_date, req.body.location, req.body.description, req.body.skills, req.body.contacts)
                    .then(key => {
                        // print newly created user 
                        get_jobapp(key.id)
                            .then(result2 => {
                                const [my_job] = result2;
                                const details = {
                                    id: key.id,
                                    user_id: my_job.user_id, 
                                    company: my_job.company, 
                                    role: my_job.role,
                                    application_date: my_job.role,
                                    location: my_job.location,
                                    description: my_job.description,
                                    skills: my_job.skills, 
                                    contacts: my_job.contacts
                                }
                                return res.status(201).json(details);
                            });
                    });
                    
                }

            });

    }

});

// get specific job application (not specifying user as one jobapp can belong to only one user)
router.get('/:jobapp_id', function(req, res) {
    get_jobapp(req.params.jobapp_id)
        .then(result => {
            if (result[0] === undefined || result[0] === null) {
                // Not found
                res.status(404).json({ 'Error': 'No job with this job_id exists' });
            } else {
                // Found, print job details
                res.status(200).json(result[0]);
            }
        });
});

// get all applications by user id 
router.get('/users/:user_id', function(req, res) {
    get_user(req.params.user_id)
    .then(result => {
        if (result[0] === undefined || result[0] === null) {
            // Not found
            res.status(404).json({ 'Error': 'No user with this user_id exists' });
        } 
        else {
            // Found, print boat details
            get_all_jobapps_per_user(req.params.user_id)
                .then(result2 => {
                    //console.log(result2);
                    const [jobs] = result2;
                    const myJobs = {
                        "description": jobs.description,
                        "location": jobs.location,
                        "company": jobs.company, 
                        "application_date": jobs.application_date,
                        "role": jobs.role, 
                        "user_id": jobs.user_id,
                        "skills": jobs.skills, 
                        "contacts": jobs.contacts,
                        "id": jobs.id
                    }

                    return res.status(200).json(myJobs);
                });
        }
    });
});


// get all jobskills identified in jobApps by user id . output key/value like nodejs: 10
router.get('/users/:user_id/skills', function(req, res) {
    get_user(req.params.user_id)
    .then(result => {
        if (result[0] === undefined || result[0] === null) {
            // Not found
            res.status(404).json({ 'Error': 'No user with this user_id exists' });
        } 
        else {
            // Found, print boat details
            get_all_jobapps_per_user(req.params.user_id)
                .then(result2 => {
                    var all_skills = [];

                    for(let x in result2) {
                        if (result2[x].skills !== undefined || result2.skills !== null) {
                            var skills_to_add = result2[x].skills;
                            for (let y in skills_to_add) {
                                all_skills.push(skills_to_add[y]);
                            }                            

                        }
                    }

                    // below logic to find # unique skills sourced from: 
                    // https://stackoverflow.com/questions/37821172/unique-counts-in-javascript-array-sorted-by-counts
                    var counts = all_skills.reduce((counts, name) => {
                        counts[name] = (counts[name] || 0) + 1;
                        return counts;
                      }, {});
                      
                      var uniques = Object.keys(counts);
                      uniques.sort((a, b) => counts[a] == counts[b] ? a.localeCompare(b) : counts[b] - counts[a]);

                    return res.status(200).json(counts);
                });
        }
    });
});

// modify jobapp 
router.put('/:jobapp_id', function(req,res) {
    // verify all required attributes present, skills/contacts optional 
    if (!(req.body.user_id && req.body.company && req.body.role && req.body.application_date && req.body.location && req.body.description)) {
        return res.status(400).send('{ "Error": "Data not formatted properly" }');
    }
    else {
        get_jobapp(req.params.jobapp_id)
        .then(result => {
            if (result[0] === undefined || result[0] === null) {
                // Not found
                res.status(404).json({ 'Error': 'No job with this job_id exists' });
            } else {
                // verify user exists (may have changed)
                get_user(req.body.user_id)
                .then((result2) => {
                    if (result2[0] === undefined || result2[0] === null) {
                        // Not found
                        return res.status(404).json({ 'Error': 'No user with this user_id exists' });
                    } 
                    else { 
                        // modify the jobapp
                        modify_jobapp(req.params.jobapp_id,req.body.user_id, req.body.company, req.body.role, req.body.application_date, req.body.location, req.body.description, req.body.skills, req.body.contacts)
                        .then(key => {
                            // print newly created user 
                            get_jobapp(key.id)
                                .then(result3 => {
                                    const [my_job] = result3;

                                    const modified = {
                                        jobapp_id: req.params.jobapp_id,
                                        user_id: my_job.user_id,
                                        company: my_job.company,
                                        role: my_job.role,
                                        application_date: my_job.application_date,
                                        location: my_job.location, 
                                        description: my_job.description,
                                        skills: my_job.skills,
                                        contacts: my_job.contacts
                                    };

                                    return res.status(201).json(modified);
                                });
                            });
                        }
                    });
                }
            });

    }

});

// delete a jobapp 
router.delete('/:jobapp_id', function(req,res) {
    get_jobapp(req.params.jobapp_id)
        .then(result => {
            if (result[0] === undefined || result[0] === null) {
                // Not found
                return res.status(404).json({ 'Error': 'No job with this job_id exists' });
            } else {
                delete_jobapp(req.params.jobapp_id)
                    .then(res.status(204).end());
            }
        })
        .catch(err => {
            return res.status(500).json({ 'Error': err });
        });
});

/* ------------- End Controller Functions ------------- */


module.exports = router;