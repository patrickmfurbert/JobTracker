import React, { useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../css/Registration.css';
import showPwdImg from '../img/show_password.svg';
import hidePwdImg from '../img/hide_password.svg';

import CUSTOM_ALERT from './Custom_Alert.jsx';


export default function Registration({signup}) {

        // post route
        const route = 'https://jobtracker467.uc.r.appspot.com/auth/signup';

        // useform and useState hooks
        const {register, handleSubmit} = useForm();
        const [isRevealPwd, setIsRevealPwd] = useState(false);

        // handle success error on registration
        const [registration_error, setRegistrationError] = useState(false)

        const success = () => setRegistrationError(false);
        const fail = () => setRegistrationError(true);

        // handle alert display
        const [show_alert, setShowAlert] = useState(false);

        // api call
        const submit = async data => {
                try {
                        console.log(data);
                        var res = await axios.post(route, data);
                        console.log(res);
                        success();
                        setShowAlert(true);
                        
                
                } catch (error) {
                        console.log(error);
                        fail();
                        setShowAlert(true);
                }
        }

        //alert messages
        const success_message = {
                header: "Success",
                body: "Your account was succesfully created"
        }

        const error_message = {
                header: "Opps",
                body: "There was a problem with the registration"
        }

            return(
                    <>
                    {/* Container for Registration */}
                                <div className="registration_container card">
                                {/* Inner Container for Registration */}
                                        <div className="inner_registration card-body m-4">
                                        {/* Alert */}
                                        {show_alert && (registration_error ? <CUSTOM_ALERT variant="danger" onClose={() => setShowAlert(false)} message={error_message}/>:<CUSTOM_ALERT variant="success" onClose={() => setShowAlert(false)} message={success_message}/>)}
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
                                                        <img alt="..." title={isRevealPwd ? "Hide password" : "Show password"}
                                                        src={isRevealPwd ? hidePwdImg : showPwdImg}
                                                        onClick={() => setIsRevealPwd(prevState => !prevState)}/>
                                                </div>
                                                {/* Submit */}
                                                <input type="submit" value="Register" className="btn btn-dark mt-4 form-control"/>
                                                </form>
                                                <div className="back_to_login mt-3">
                                                        <p class="text-center">Back to <span id="login_link" onClick={signup()}>Login</span></p>
                                                </div>
                                        </div>
                                </div>
                    </>
            );
}