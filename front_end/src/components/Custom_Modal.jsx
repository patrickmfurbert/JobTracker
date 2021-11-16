import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Modal, Form, Button } from 'react-bootstrap';
import CUSTOM_ALERT from './Custom_Alert.jsx';



export default function Custom_Modal({show, handleClose, user_id, app_id, company, role, application_date, location, description, updateMal}) {

            // route for deleting app
            const route = `https://jobtracker467.uc.r.appspot.com/jobapps/${app_id}`;

            const {register, handleSubmit} = useForm();

            const [submission_error, setSubmissionError] = useState(false);

            const success = () => setSubmissionError(false);
            const fail = () => setSubmissionError(true);

            const [show_alert, setShowAlert] = useState(false);

            const submit = async data => {
              try {
                console.log({user_id, ...data});
                var res = await axios.put(route, {user_id, ...data});
                console.log(res);
                updateMal();
                success();
                setShowAlert(true);
              } catch (error) {
                console.log(error);
                fail();
                setShowAlert(true);
              }
            }


                    //alert messages
            const success_message = {
                header: "Success",
                body: "Application succesfully updated"
            }

            const error_message = {
                    header: "Opps",
                    body: "THere was a problem with the update"
            }

            return(
                    <>
                          <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                            <Modal.Title>Update Application</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            {/* Alert */}
                            {show_alert && (submission_error ? <CUSTOM_ALERT variant="danger" onClose={() => setShowAlert(false)} message={error_message}/>:<CUSTOM_ALERT variant="success" onClose={()=> setShowAlert(false)} message={success_message}/>)}
                            {/* Form */}
                              <Form onSubmit={handleSubmit(submit)}>
                              {/* Company */}
                                  <Form.Group className="mb-3">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control type="text" defaultValue={company} {...register("company")}/>
                                  </Form.Group>
                                  {/* Role */}
                                  <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" defaultValue={role} {...register("role")}/>
                                  </Form.Group>
                                  {/* Date */}
                                  <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" defaultValue={application_date} {...register("application_date")}/>
                                  </Form.Group>
                                  {/* Location */}
                                  <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" defaultValue={location} {...register("location")}/>
                                  </Form.Group>
                                  {/* Description */}
                                    <Form.Group className="mb-3">
                                      <Form.Label>Description</Form.Label>
                                      <Form.Control as="textarea" rows={3} defaultValue={description} {...register("description")}/>
                                    </Form.Group>

                                   <Button className="m-1" variant="dark" type="submit">Update</Button>
                                </Form>

                            </Modal.Body>
                        </Modal>
                    </>
            );
}


