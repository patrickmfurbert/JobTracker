import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import '../css/New_App.css';


export default function New_App(){

        const {register, handleSubmit} = useForm();

        const submit = async data => {
            console.log("garbage");
        }

        return(

                <>
                    {/* Container for New Application */}
                    <div className="new_app_container card">

                        {/* Inner Container for New Application */}
                        <div className="inner_new_app card-body m-4">

                            {/* Title */}
                            <h1 className="display-6">Add Job Application</h1>
                        
                            {/* Form */}
                            <form onSubmit={handleSubmit(submit)}>
                            
                            </form>

                        </div>

                    </div>

                </>

        );

}