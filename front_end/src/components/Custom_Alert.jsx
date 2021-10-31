import React from 'react';
import { Alert } from 'react-bootstrap';


export default function Custom_Alert({variant, onClose, message}){

        return(

                <>

                    <Alert variant={variant} onClose={onClose} dismissible>
                        <Alert.Heading>{message.header}</Alert.Heading>
                        <p>
                            {message.body}
                        </p>
                    </Alert>

                </>

        );

}