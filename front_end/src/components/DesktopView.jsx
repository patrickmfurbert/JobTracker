import React, { useState } from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
import NEW_APP from './New_App.jsx';
import CURRENT_APPS from './Current_Apps.jsx';
import SKILLS from './Skills.jsx';
import '../css/MainApp.css';
import '../css/DashBoard.css';

export default function DesktopView({user_id, signup, width}){

        //handle rerender of Current Apps from New App
        const [updateView, setUpdate] = useState(true)
        const setUpdateView = () => setUpdate(!updateView)
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
                                    <CURRENT_APPS user_id={user_id} updateView={updateView}/>
                                    <SKILLS user_id={user_id} width={width}/>
                                </div>

                                <div className="right_column">
                                    <NEW_APP user_id={user_id} updateView={setUpdateView}/>
                                </div>

                            </div>


                    </div>

                </>

        );

}