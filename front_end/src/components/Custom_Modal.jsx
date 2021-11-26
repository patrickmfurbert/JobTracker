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
                let skills = job_skills;
                console.log({user_id, skills, ...data});
                var res = await axios.put(route, {user_id, skills, ...data});
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
            const [job_skills, updateJobSkills] = useState(skills ? [...skills] : []);

            const handleOnChange = event => {
              setSkillText(event.target.value);
              }

            //add skills to job_skills
            const addSkills = () => {
                updateJobSkills( prev => [...prev, skill_text] );
              }

            // remove jobskill = function to remove the job skill
            const removeSkill = old_skill => {
              console.log(old_skill);
              updateJobSkills(job_skills.filter(item => item !== old_skill));
            }


            //contact information
            const [my_contacts, updateContacts] = useState(contacts ? [...contacts] : []);

            const addContact = () => {
                updateContacts(prev => [...prev, {name: contactName, email: contactEmail, role: contactRole, comment: contactComment}]);
            }

            const [contactName, setContactName] = useState("");
            const [contactEmail, setContactEmail] = useState("");
            const [contactRole, setContactRole] = useState("");
            const [contactComment, setContactComment] = useState("");

            const handleContactNameOnChange = event => {
              setContactName(event.target.value);
            }

            const handleContactEmailOnChange = event => {
              setContactEmail(event.target.value);
            }

            const handleContactRoleOnChange = event => {
              setContactRole(event.target.value);
            }

            const handleContactCommentOnChange = event => {
              setContactComment(event.target.value);
            }

            const addNewContact = () => {
              console.log(`Name: ${contactName}\nEmail: ${contactEmail}\nRole: ${contactRole}\nComment: ${contactComment}`);
              addContact();
              console.log(my_contacts);
            }


            return(
                    <>
                          <Modal 
                              className="custom_modal_90"
                              dialogClassName="custom_modal_90"
                              show={show} 
                              onHide={handleClose} 
                              centered>
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
                                              <Form.Label>Company hmm</Form.Label>
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

                                          {/* Skills */}
                                          <Card body bg="secondary" text="white" >

                                            <Card.Title>Skills</Card.Title>

                                                  <Card.Subtitle>
                                                    {/* skills input group */}
                                                    <InputGroup className="mb-3 mt-2">
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
                                                    (job_skills.length !== 0 ) && job_skills.map( skill => ( <Badge bg="dark" className="m-1" key={skill}>{skill} <CgCloseO className="badge_close" onClick={()=>removeSkill(skill)}/></Badge> ))
                                                  }

                                            </Card>

                                                                                      {/* Contacts */}
                                          <Card body bg="secondary" text="white" className="mt-3">
                                            
                                            <Card.Title>
                                              Contacts
                                            </Card.Title>
                                            <Card.Subtitle>


                                            <InputGroup size="sm" className="mb-3 mt-2">
                                              <FormControl aria-label="Name" placeholder="Name" onChange={handleContactNameOnChange}/>
                                              <FormControl aria-label="Email"  placeholder="Email" onChange={handleContactEmailOnChange}/>
                                            </InputGroup>

                                            <InputGroup size="sm" className="mb-3">
                                              <FormControl aria-label="Role" placeholder="Role" onChange={handleContactRoleOnChange}/>
                                              <FormControl aria-label="Comment"  placeholder="Comment" onChange={handleContactCommentOnChange}/>
                                              <Button variant="dark" size="sm" onClick={addNewContact}>Add Contact</Button>
                                            </InputGroup>

                                           

                                            </Card.Subtitle>

                                            {
                                              (my_contacts.length !== 0) && my_contacts.map()
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


