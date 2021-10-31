import React, { useState } from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
import NEW_APP from './New_App.jsx';
import '../css/MainApp.css';

export default function MainApp({currentUser}){

        return(

                <>
                    <div id="MainAppContainer">
                        {/* Navigation */}
                        <CUSTOM_NAV/>
                        <div id="MainApp_Inner">
                            <NEW_APP currentUser={currentUser}/>
                        </div>
                    </div>

                </>

        );

}