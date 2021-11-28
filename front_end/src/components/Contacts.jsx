import React, {useState} from 'react';
import '../css/Contacts.css';

export default function Contacts({user_id}) {

    let style = {
        height: '1px',
        width: '92%',
        color: 'black',
        'marginLeft': 'auto',
        'marginRight': 'auto'
    }

    return(
        <>
                    {/*  */}
                    <div className="dashboard_element_wrapper">
                        <h1 className="display-6 mt-4 mb-4" id="contacts_title">Contacts</h1>
                        <hr style={style}/>


                    </div>
        </>
    );
}