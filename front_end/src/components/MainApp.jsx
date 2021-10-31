import React from 'react';
import CUSTOM_NAV from './Custom_Nav.jsx';
import NEW_APP from './New_App.jsx';
import '../css/MainApp.css';

export default function MainApp({user_id}){

        return(

                <>
                    <div id="MainAppContainer">
                        {/* Navigation */}
                        <CUSTOM_NAV/>
                        <NEW_APP user_id={user_id}/>
                        
                    </div>

                </>

        );

}