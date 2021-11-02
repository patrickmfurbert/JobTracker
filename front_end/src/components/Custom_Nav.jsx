import { Navbar, Offcanvas, Nav, Container} from 'react-bootstrap';

import React from 'react';


export default function Custom_Nav({signup, update_mainapp}){

        return(

                <>
                    <Navbar bg="dark" variant="dark" expand={false}>
                        <Container fluid>

                            <Navbar.Brand>Job Tracker</Navbar.Brand>
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
                                            <Nav.Link onClick={()=>update_mainapp("new_app")}>Add Application</Nav.Link>
                                            <Nav.Link onClick={signup()}>Logout</Nav.Link>
                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </>

        );

}