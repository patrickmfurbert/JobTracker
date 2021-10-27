import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/Registration.css';
import showPwdImg from '../img/show_password.svg';
import hidePwdImg from '../img/hide_password.svg';


export default function Registration() {

        // post route
        const route = 'garbage';

        // useform and useState hooks
        const {register, handleSubmit} = useForm();
        const [isRevealPwd, setIsRevealPwd] = useState(false);


            return(
                    <>
                    {/* Container for Registration */}
                        <div className="registration_container card">

                        {/* Inner Container for Registration */}
                                <div className="inner_registration card-body m-4">

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
                                        <div className="pwd-container">
                                                <input type={isRevealPwd ? "text" : "password"} name="password" id="password" className="form-control"/>
                                                <img title={isRevealPwd ? "Hide password" : "Show password"}
                                                src={isRevealPwd ? hidePwdImg : showPwdImg}
                                                onClick={() => setIsRevealPwd(prevState => !prevState)}/>
                                        </div>

                                        {/* Submit */}
                                        <input type="submit" value="Register" className="btn btn-dark mt-4 form-control"/>

                                        </form>
                                </div>
                        </div>
                    </>
            );
}