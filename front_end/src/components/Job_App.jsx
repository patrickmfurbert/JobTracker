import React, { useState } from 'react';
import {Card, Button } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa'
import { GrDocumentUpdate } from 'react-icons/gr'
import '../css/Job_App.css';
import axios from 'axios';
import CUSTOM_MODAL from './Custom_Modal.jsx'


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
        // implement function to modify application

        // Modal
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return(

                <>
                    <div className="job_app_container">
                        <Card bg='dark' text='white'>
                            <Card.Header as="h4">{company}</Card.Header>
                            <Card.Body>
                                <Card.Title>{role}</Card.Title>
                               <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>

                               {/* Buttons */}

                               {/* Update App */}
                                <Button title="Update App" onClick={handleShow} className="m-1" variant="secondary"><GrDocumentUpdate/></Button>

                                {/* Delete App */}
                                <Button title="Delete App" onClick={delete_app} className="m-1" variant="secondary"><FaRegTrashAlt/></Button>
                            </Card.Body>
                        </Card>
                    </div>

                    <CUSTOM_MODAL show={show} handleClose={handleClose}/>
                </>

        );

}