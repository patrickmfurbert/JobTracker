import React from 'react';
import {Card, Button } from 'react-bootstrap';
import '../css/Job_App.css';


export default function Job_App({user_id, company, role, application_date, location, description}){

        // implement function to delete application

        // implmenet function to modify application

        return(

                <>
                    <div className="job_app_container">
                        <Card>
                            <Card.Header as="h5">Facebook</Card.Header>
                            <Card.Body>
                                <Card.Title>Junior Dev 10/2/21</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Location</Card.Subtitle>
                                <Card.Text>
                                The Job description
                                </Card.Text>
                                <Button className="m-1" variant="secondary">update</Button>
                                <Button className="m-1" variant="dark">delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </>

        );

}