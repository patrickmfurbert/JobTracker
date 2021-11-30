import { Navbar, Offcanvas, Nav, Container} from 'react-bootstrap';
import '../css/Custom_Nav.css';
import React, {useState} from 'react';


export default function Custom_Nav({signup, update_mainapp, desktop}){



        return(

                <>
                    <Navbar bg="dark" variant="dark" expand={false}>
                        <Container fluid>
                            <Navbar.Brand><div id="nav_title">Job Tracker </div></Navbar.Brand>

                            {
                                (!desktop) ?
                                (
                                <>
                                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                                    <Navbar.Offcanvas
                                    id="offcanvasNavbar"
                                    aria-labelledby="offcanvasNavbarLabel"
                                    placement="end"
                                    >
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title id="offcanvasNavbarLabel">Navigation</Offcanvas.Title>
                                        </Offcanvas.Header>

                                        <Offcanvas.Body>
                                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                                <Nav.Link onClick={() => update_mainapp("current_apps")}>Current Applications</Nav.Link>
                                                <Nav.Link onClick={() => update_mainapp("new_app")}>Add Application</Nav.Link>
                                                <Nav.Link onClick={() => update_mainapp("skills")}>Skills</Nav.Link>
                                                <Nav.Link onClick={() => update_mainapp("contacts")}>Contacts</Nav.Link>
                                                <Nav.Link onClick={signup()}>Logout</Nav.Link>
                                            </Nav>
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </>
                                ) 
                                :
                                <Nav className="justify-content-end">
                                <Nav.Link onClick={signup()}>Logout</Nav.Link>
                              </Nav>
                            }
                            



                        </Container>
                    </Navbar>
                </>

        );

}