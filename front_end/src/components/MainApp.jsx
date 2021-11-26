import React, { useState } from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
import NEW_APP from './New_App.jsx';
import CURRENT_APPS from './Current_Apps.jsx';
import SKILLS from './Skills.jsx';
import '../css/MainApp.css';

export default function MainApp({user_id, signup}){

        const [display, setDisplay] = useState("current_apps");

        const changeDisplay = function (name) {
            setDisplay(name);
        }

        return(

                <>
                    {/* Main App Canvas */}
                    <div id="MainAppContainer">

                        {/* Navigation */}
                        <CUSTOM_NAV signup={signup} update_mainapp={changeDisplay}/>

                        {/* Sub Components */}

                            
                            {(display === "current_apps") && <CURRENT_APPS user_id={user_id}/>}                        

                            {(display === "new_app") && <NEW_APP user_id={user_id}/>} 

                            {(display === "skills") && <SKILLS user_id={user_id}/>}

                            {(display === "contacts") && <h1>ContactZ</h1>}


                    </div>

                </>

        );

}