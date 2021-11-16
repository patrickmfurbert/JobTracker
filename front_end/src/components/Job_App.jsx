import React from 'react';
import {Card, Button } from 'react-bootstrap';
import '../css/Job_App.css';
import axios from 'axios';


export default function Job_App({app_id, user_id, company, role, application_date, location, description, updateMal}){

        // route for deleting app
        const route = `https://jobtracker467.uc.r.appspot.com/jobapps/${app_id}`;

        // implement function to delete application
        const delete_app = async () => {
            try {
                var res = await axios.delete(route);
                console.log(res);
                updateMal();
            } catch (error) {
                console.log(error);
            }
        }
        // implmenet function to modify application

        return(

                <>
                    <div className="job_app_container">
                        <Card>
                            <Card.Header as="h5">{company}</Card.Header>
                            <Card.Body>
                                <Card.Title>{role} {application_date}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
                                <Card.Text>
                                {description}
                                </Card.Text>
                                <Button className="m-1" variant="secondary">update</Button>
                                <Button onClick={delete_app} className="m-1" variant="dark">delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </>

        );

}