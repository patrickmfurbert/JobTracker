import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Modal, Form, Button, Card, Container, Row, Col, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { VscAdd } from 'react-icons/vsc';
import { CgCloseO } from 'react-icons/cg';
import CUSTOM_ALERT from './Custom_Alert.jsx';
import '../css/Custom_Modal.css';



export default function Custom_Modal({show, handleClose, user_id, app_id, company, role, application_date, location, description, skills, contacts, updateMal}) {

            // route for deleting app
            const route = `https://jobtracker467.uc.r.appspot.com/jobapps/${app_id}`;

            // useForm hook for updating 
            const {register, handleSubmit} = useForm();
            const [submission_error, setSubmissionError] = useState(false);

            // update UI on success or failure
            // adjust state of the submission
            const success = () => setSubmissionError(false);
            const fail = () => setSubmissionError(true);
            const [show_alert, setShowAlert] = useState(false);

            // async submit function
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


            //success and error object alert messages
            const success_message = {
                header: "Success",
                body: "Application succesfully updated"
            }

            const error_message = {
                    header: "Opps",
                    body: "THere was a problem with the update"
            }

            // Skills update
            const [skill_text, setSkillText] = useState("");
            const [job_skills, updateJobSkills] = useState([]);

            const handleOnChange = event => {
              setSkillText(event.target.value);
              // console.log(skill_text);
              }

            //add skills to job_skills
            const addSkills = () => {

                updateJobSkills( prev => [...prev, skill_text] );

              }

            // remove jobskill
            const removeSkill = old_skill => {
              console.log(old_skill);
              updateJobSkills(job_skills.filter(item => item !== old_skill));
            }

            return(
                    <>
                          <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                            <Modal.Title>Update Application</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            {/* Alert */}
                            {show_alert && (submission_error ? <CUSTOM_ALERT variant="danger" onClose={() => setShowAlert(false)} message={error_message}/>:<CUSTOM_ALERT variant="success" onClose={()=> setShowAlert(false)} message={success_message}/>)}

                            {/* Form */}
                              <Form onSubmit={handleSubmit(submit)}>

                                  {/* fluid container for form */}
                                  <Container fluid>

                                    <Row>

                                      {/* left column */}
                                      <Col>
                                        {/* Meat */}
                                        <Card body bg="dark" text="white">
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
                                          </Card>
                                      </Col>

                                        {/* right column */}
                                        <Col>
                                          {/* Contacts */}
                                          <Card body bg="secondary" text="white">
                                            Contacts
                                          </Card>
                                          {/* Skills */}
                                          <Card body bg="secondary" text="white" className="mt-3">

                                            <Card.Title>Skills</Card.Title>

                                                  <Card.Subtitle>
                                                    {/* skills input group */}
                                                    <InputGroup className="mb-3">
                                                      {/* add button icon */}
                                                      <Button variant="dark" size="sm" onClick={addSkills}>
                                                        <VscAdd/>
                                                      </Button>
                                                          <FormControl
                                                            placeholder="New Skill"
                                                            onChange={handleOnChange}
                                                          />
                                                    </InputGroup>
                                                  </Card.Subtitle>

                                                  {
                                                    job_skills.map( skill => ( <Badge bg="dark" className="m-1" key={skill}>{skill} <CgCloseO className="badge_close" onClick={()=>removeSkill(skill)}/></Badge> ))
                                                  }

                                            </Card>
                                        </Col>
                                    </Row>

                                  </Container>
                                  {/* End container */}

                                    {/* Form Submit Button */}
                                   <div className="d-grid gap-2 mt-3">
                                    <Button className="m-1" variant="dark" type="submit">Update</Button>
                                  </div>
                                </Form>

                            </Modal.Body>
                        </Modal>
                    </>
            );
}


