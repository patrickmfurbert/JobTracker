import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import CUSTOM_ALERT from './Custom_Alert.jsx';
import '../css/New_App.css';


export default function New_App({user_id, updateView}){

        // post route
        const route = 'https://jobtracker467.uc.r.appspot.com/jobapps';

        const {register, handleSubmit} = useForm();

        const [submission_error, setSubmissionError] = useState(false);

        const success = () => setSubmissionError(false);
        const fail = () => setSubmissionError(true);

        const [show_alert, setShowAlert] = useState(false);

        const submit = async data => {
            try {
                    await axios.post(route, {user_id, ...data});
                    success();
                    setShowAlert(true);
                    if(updateView){
                        updateView();
                    }
                
            } catch (error) {
                    console.log(error);
                    fail();
                    setShowAlert(true);
                }
        }

        //alert messages
        const success_message = {
            header: "Success",
            body: "Application succesfully submitted"
        }

        const error_message = {
                header: "Opps",
                body: "THere was a problem with submission"
        }

        let style = {
            height: '1px',
            width: '92%',
            color: 'black',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }


        return(

                <>
                {/* Component Container */}
                <div className="dashboard_element_wrapper">

                <h1 className="display-6 mt-4 mb-4" id="new_app_title">Create New Application</h1>
                <hr style={style}/>
                    <div id="new_app_canvas">


                        {/* Container for New Application */}
                        <div className="new_app_container">
                            {/* Inner Container for New Application */}
                                {/* Alert */}
                                {show_alert && (submission_error ? <CUSTOM_ALERT variant="danger" onClose={() => setShowAlert(false)} message={error_message}/>:<CUSTOM_ALERT variant="success" onClose={()=> setShowAlert(false)} message={success_message}/>)}
                                {/* Title */}
                                {/* <h1 className="display-6">Add Job Application</h1> */}
                    
                                {/* Form */}
                                <form onSubmit={handleSubmit(submit)}>
                                {/* Company */}
                                <label htmlFor="company" >Company</label>
                                <input type="text" name="company" id="company" className="form-control mt-2 mb-1" {...register("company")}/>
                                {/* Role */}
                                <label htmlFor="role">Role</label>
                                <input type="text" name="role" id="role" className="form-control mt-2 mb-1" {...register("role")}/>
                                {/* Application Date */}
                                <label htmlFor="date">Application Date</label>
                                <input className="form-control mt-2 mb-1" type="date" name="date" id="date" {...register("application_date")}/>
                                {/* Location */}
                                <label htmlFor="location">Location</label>
                                <input className="form-control mt-2 mb-1" type="text" name="location" id="location" {...register("location")}/>
                                {/* Description */}
                                <label htmlFor="job_description">Job Description</label>
                                <textarea className="form-control mt-2 mb-1" name="job_description" id="" cols="30" rows="10" {...register("description")}></textarea>
                                {/* Submit */}
                    
                                <input type="submit" value="Submit Application" className="my_button mt-4 form-control"/>
                                </form>
                            </div>
                        
                    </div>
                </div>

                </>

        );

}