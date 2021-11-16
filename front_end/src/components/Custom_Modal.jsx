import React from 'react';
import { Modal } from 'react-bootstrap';



export default function Custom_Modal({show, handleClose}) {

            return(
                    <>
                          <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton>
                            <Modal.Title>YO</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>what up</Modal.Body>
                        </Modal>
                    </>
            );
}