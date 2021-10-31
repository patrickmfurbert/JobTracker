import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import '../css/New_App.css';


export default function New_App(){

        return(

                <>
                    {/* Container for New Application */}
                    <div className="new_app_container card">

                        {/* Inner Container for New Application */}
                        <div className="inner_new_app card-body m-4">

                            <h1 className="display-6">Add Job Application</h1>
                        

                        </div>

                    </div>

                </>

        );

}