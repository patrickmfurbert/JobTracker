import React, { useState } from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
import NEW_APP from './New_App.jsx';
import CURRENT_APPS from './Current_Apps.jsx';
import SKILLS from './Skills.jsx';
import CONTACTS from './Contacts.jsx';
import '../css/MainApp.css';

export default function MobileView({user_id, signup, width}){

        const [display, setDisplay] = useState("current_apps");

        const changeDisplay = function (name) {
            setDisplay(name);
        }

        const desktop = false;


        return(

                <>
                    {/* Main App Canvas */}
                    <div id="MainAppContainer">

                        {/* Navigation */}
                        <CUSTOM_NAV signup={signup} update_mainapp={changeDisplay} desktop={desktop}/>

                        {/* Sub Components */}

                            
                            {(display === "current_apps") && <CURRENT_APPS user_id={user_id}/>}                        

                            {(display === "new_app") && <NEW_APP user_id={user_id}/>} 

                            {(display === "skills") && <SKILLS user_id={user_id} width={width}/>}

                            {(display === "contacts") &&  <CONTACTS user_id={user_id}/>}


                    </div>

                </>

        );

}