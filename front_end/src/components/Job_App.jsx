import React, { useState } from 'react';
impport {Card, Button } from 'react-bootstrap'


export default function Job_App({user_id, company, role, application_date, location, description}){

        // implement function to delete application

        // implmenet function to modify application

        return(

                <>
                    <Card>
                        <Card.Header as="h5">Facebook</Card.Header>
                        <Card.Body>
                            <Card.Title>Junior Dev 10/2/21</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Location</Card.Subtitle>
                            <Card.Text>
                            The Job description
                            </Card.Text>
                            <Button variant="secondary">update</Button>
                            <Button varient="dark">delete</Button>
                        </Card.Body>
                    </Card>
                </>

        );

}