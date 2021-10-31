import React, { useState } from 'react';
impport {Card, Button } from 'react-bootstrap'


export default function Job_App(){

        // implement function to delete application

        // implmenet function to modify application

        return(

                <>
                    <Card>
                        <Card.Header as="h5">Featured</Card.Header>
                        
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </>

        );

}