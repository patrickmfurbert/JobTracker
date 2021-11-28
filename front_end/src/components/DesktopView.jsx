import React, { useState } from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
import NEW_APP from './New_App.jsx';
import CURRENT_APPS from './Current_Apps.jsx';
import SKILLS from './Skills.jsx';
import '../css/MainApp.css';
import '../css/DashBoard.css';

export default function DesktopView({user_id, signup, width}){

        const [display, setDisplay] = useState("current_apps");

        const changeDisplay = function (name) {
            setDisplay(name);
        }

        const desktop = true;

        return(

                <>
                    {/* Main App Canvas */}
                    <div id="MainAppContainer">

                        {/* Navigation */}
                        <CUSTOM_NAV signup={signup} update_mainapp={changeDisplay} desktop={desktop}/>

                        {/* Sub Components */}

                            
                            <div id="DashBoard_Desktop" className="dash">

                                <div className="left_column">
                                    <CURRENT_APPS user_id={user_id}/>
                                    <SKILLS user_id={user_id}/>
                                </div>

                                <div className="right_column">
                                    <NEW_APP user_id={user_id}/>
                                </div>

                            </div>


                    </div>

                </>

        );

}