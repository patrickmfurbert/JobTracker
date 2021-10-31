import React from 'react';
import { Modal } from 'react-bootstrap';



export default function Custom_Modal({show, handleClose, message, exit}) {

            return(
                    <>
                          <Modal show={show} onHide={handleClose} onExited={exit}>
                            <Modal.Header closeButton>
                            <Modal.Title>{message.header}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{message.body}</Modal.Body>
                        </Modal>
                    </>
            );
}