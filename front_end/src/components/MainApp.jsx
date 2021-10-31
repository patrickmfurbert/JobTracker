import React, { useState } from 'react';
import CUSTOM_NAV from './Custom_Nav';
import '../css/MainApp.css';

export default function MainApp(){

        return(

                <>
                    <div id="MainAppContainer">
                        {/* Navigation */}
                        <CUSTOM_NAV/>
                    </div>

                </>

        );

}