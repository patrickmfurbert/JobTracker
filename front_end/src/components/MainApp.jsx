import React from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
// import NEW_APP from './New_App.jsx';
import CURRENT_APPS from './Current_Apps.jsx';
import '../css/MainApp.css';

export default function MainApp({user_id, signup}){

        return(

                <>
                    <div id="MainAppContainer">
                        {/* Navigation */}
                        <CUSTOM_NAV signup={signup}/>
                        {/* <NEW_APP user_id={user_id}/> */}
                        <CURRENT_APPS/>
                        
                    </div>

                </>

        );

}