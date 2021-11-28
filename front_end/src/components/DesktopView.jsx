import React, { useState } from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
import NEW_APP from './New_App.jsx';
import CURRENT_APPS from './Current_Apps.jsx';
import SKILLS from './Skills.jsx';
import CONTACTS from './Contacts.jsx';

import '../css/MainApp.css';
import '../css/DashBoard.css';

export default function DesktopView({user_id, signup, width}){

        //handle rerender of Current Apps from New App
        const [updateView, changeView] = useState(true);
        const setUpdateView = () => {
            changeView(!updateView);
        }

        //handle rerender of Skills from Current Apps
        const [updateSkills, changeSkills] = useState(true);
        const setUpdateSkills = () =>{
            changeSkills(!updateSkills);
        }

        //handle rerender of contacts from Current Apps
        const [updateContacts, changeContacts] = useState(true);
        const setUpdateContacts = () => {
            changeContacts(!updateContacts);
        }

        const desktop = true;

        return(

                <>
                    {/* Main App Canvas */}
                    <div id="MainAppContainer">

                        {/* Navigation */}
                        <CUSTOM_NAV signup={signup} desktop={desktop}/>

                            {/* Sub Components */}                            
                            <div id="DashBoard_Desktop" className="dash">

                                <div className="left_column">
                                    <CURRENT_APPS user_id={user_id} updateView={updateView} updateSkills={setUpdateSkills} updateContacts={setUpdateContacts}/>
                                    <SKILLS user_id={user_id} width={width} updateView={updateSkills}/>
                                </div>

                                <div className="right_column">
                                    <NEW_APP user_id={user_id} updateView={setUpdateView}/>
                                    <CONTACTS user_id={user_id} updateView={updateContacts}/>
                                </div>

                            </div>


                    </div>

                </>

        );

}