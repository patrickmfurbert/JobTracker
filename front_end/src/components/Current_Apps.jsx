import React, { useState } from 'react';
import JOB_APP from './Job_App.jsx';
import '../css/Current_Apps.css';


export default function Current_Apps(){

        let my_array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        return(

                <>
                    {/* Canvas for Current Apps */}

                    <div id="current_apps_canvas">

                        {my_array.map(()=><JOB_APP/>)}

                    </div>
                </>

        );

}