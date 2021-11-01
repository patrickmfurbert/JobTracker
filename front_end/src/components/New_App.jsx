import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import '../css/New_App.css';


export default function New_App({user_id}){

        // post route
        const route = 'http://localhost:5000/jobapps';

        const {register, handleSubmit} = useForm();

        const submit = async data => {
            try {
                    var res = axios.post(route, {user_id, ...data});
                    console.log(res);
                
            } catch (error) {
                    console.log(error);
            }
        }



        return(

                <>
                {/* Component Container */}
                <div id="new_app_canvas">
                    {/* Container for New Application */}
                    <div className="new_app_container card">

                        {/* Inner Container for New Application */}
                        <div className="inner_new_app card-body m-4">

                            {/* Title */}
                            <h1 className="display-6">Add Job Application</h1>
                        
                            {/* Form */}
                            <form onSubmit={handleSubmit(submit)}>

                            {/* Company */}
                            <label htmlFor="company">Company</label>
                            <input type="text" name="company" id="company" className="form-control" {...register("company")}/>

                            {/* Role */}

                            <label htmlFor="role">Role</label>
                            <input type="text" name="role" id="role" className="form-control" {...register("role")}/>

                            {/* Application Date */}

                            <label htmlFor="date">Application Date</label>
                            <input className="form-control" type="date" name="date" id="date" {...register("application_date")}/>


                            {/* Location */}
                            <label htmlFor="location">Location</label>
                            <input className="form-control" type="text" name="location" id="location" {...register("location")}/>

                            {/* Description */}

                            <label htmlFor="job_description">Job Description</label>
                            <textarea className="form-control" name="job_description" id="" cols="30" rows="10" {...register("description")}></textarea>


                            {/* Submit */}
                            
                            <input type="submit" value="Submit Application" className="btn btn-dark mt-4 form-control"/>

                            </form>

                        </div>

                    </div>

                </div>

                </>

        );

}