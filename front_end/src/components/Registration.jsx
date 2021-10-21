import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/Registration.css';


export default function Registration() {

        // post route
        const route = 'garbage';

        // use form hook
        const {register, handleSubmit} = useForm();


            return(
                    <>
                    {/* Container for Registration */}
                        <div className="registration_container card">

                        {/* Inner Container for Registration */}
                                <div className="inner_registration card-body">

                                {/* Title */}
                                <h1 className="display-6">Register New Account </h1>

                                {/* Form  */}
                                        <form action="">

                                        {/* First Name */}
                                        <label htmlFor="firstname" className="form-label">First Name</label>
                                        <input type="text" name="firstname" id="firstname" className="form-control" />

                                        {/* Last Name */}
                                        <label htmlFor="lastname" className="form-label">Last Name</label>
                                        <input type="text" name="lastname" id="lastname" className="form-control" />

                                        {/* Email */}
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" />

                                        {/* Password */}
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name="password" id="password" className="form-control"/>

                                        {/* Submit */}
                                        <input type="submit" value="Register" className="btn btn-dark mt-4 form-control"/>

                                        </form>
                                </div>
                        </div>
                    </>
            );
}