import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../css/Registration.css';
import showPwdImg from '../img/show_password.svg';
import hidePwdImg from '../img/hide_password.svg';

import Custom_Modal from './Custom_Modal.jsx'


export default function Registration() {

        // post route
        const route = 'http://localhost:5000/auth/signup';

        // useform and useState hooks
        const {register, handleSubmit} = useForm();
        const [isRevealPwd, setIsRevealPwd] = useState(false);
        const [showSuccessToast, setShowSuccessToast] = useState(false);

        // handle error modal
        const [show_error, setErrorShow] = useState(false);
        const handleErrorClose = () => setErrorShow(false);
        const handleErrorShow = () => setErrorShow(true);

        // handle success modal
        const [show_success, setSuccessShow] = useState(false);
        const handleSuccessClose = () => setSuccessShow(false);
        const handleSuccesShow = () => setSuccessShow(true);

        // api call
        const submit = async data => {
                try {
                        var res = await axios.post(route, data);
                        console.log(res)
                        handleSuccesShow()

                
                } catch (error) {
                        handleErrorShow();
                        console.log(error);
                }
        }

        // modal messages
        const success_message = {
                header: "Success",
                body: "Your account was succesfully created"
        }

        const error_message = {
                header: "Opps",
                body: "There was a problem with the registration, please try again..."
        }

            return(
                    <>
                    {/* Container for Registration */}
                        <div className="registration_container card">

                        {/* Inner Container for Registration */}
                                <div className="inner_registration card-body m-4">

                                {/* Title */}
                                <h1 className="display-6">Register New Account </h1>

                                {/* Form  */}
                                        <form onSubmit={handleSubmit(submit)}>

                                        {/* First Name */}
                                        <label htmlFor="firstname" className="form-label">First Name</label>
                                        <input type="text" name="firstname" id="firstname" className="form-control" />

                                        {/* Last Name */}
                                        <label htmlFor="lastname" className="form-label">Last Name</label>
                                        <input type="text" name="lastname" id="lastname" className="form-control" />

                                        {/* Email */}
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" {...register("email")}/>

                                        {/* Password */}
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="pwd-container">
                                                <input type={isRevealPwd ? "text" : "password"} name="password" id="password" className="form-control"{...register("password")}/>
                                                <img title={isRevealPwd ? "Hide password" : "Show password"}
                                                src={isRevealPwd ? hidePwdImg : showPwdImg}
                                                onClick={() => setIsRevealPwd(prevState => !prevState)}/>
                                        </div>

                                        {/* Submit */}
                                        <input type="submit" value="Register" className="btn btn-dark mt-4 form-control"/>

                                        <Custom_Modal show={show_error} handleClose={handleErrorClose} message={error_message}/>
                                        <Custom_Modal show={show_success} handleClose={handleSuccessClose} message={success_message}/>

                                        </form>
                                </div>
                        </div>
                    </>
            );
}