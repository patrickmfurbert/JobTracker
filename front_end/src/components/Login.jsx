import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/Login.css';
import axios from 'axios';
import tracker_icon from '../img/geo.svg';
import showPwdImg from '../img/show_password.svg';
import hidePwdImg from '../img/hide_password.svg';


export default function Login({signup}) {

            const route = 'garbage';

            const {register, handleSubmit} = useForm();
            const [isRevealPwd, setIsRevealPwd] = useState(false);

            const submit = async data => {
                console.log(data);
            }


            return(
                    <>
                        <div id="login_container" class="card">
                            <div className="card-body m-4 mb-0 pb-1">

                                <div className="login_logo mb-3">
                                    <img src={tracker_icon} alt="tracker" id="tracker"/>

                                    <h1 className="display-6 mb-0 ms-2" id="jobtracker_h1">
                                    Job Tracker
                                    </h1>
                                </div>

                                <form onSubmit={handleSubmit(submit)}>
                                    <label htmlFor="username" className="form-label">username</label>
                                    <input type="text" name="username" id="username" className="form-control" />

                                    <label htmlFor="password" className="form-label">password</label>

                                    <div className="pwd-container">
                                        <input type={isRevealPwd ? "text" : "password"} name="password" id="password" className="form-control"/>
                                        <img title={isRevealPwd ? "Hide password" : "Show password"}
                                        src={isRevealPwd ? hidePwdImg : showPwdImg}
                                        onClick={() => setIsRevealPwd(prevState => !prevState)}
                                        />
                                    </div>

                                    <input type="submit" value="Login" className="btn btn-dark mt-4 form-control"/>
                                </form>

                                <div className="sign_up mt-3">
                                    <p>Don't have an account? <span id="signup_link" onClick={signup(false)}>Sign up</span></p>
                                </div>
                            </div>
                        </div>
                    </>
            );
}