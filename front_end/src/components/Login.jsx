import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/Login.css';
import axios from 'axios';
import tracker_icon from '../img/geo.svg';


export default function Login() {

            const route = 'garbage';

            const {register, handleSubmit} = useForm();

            const submit = async data => {
                console.log(data);
            }


            return(
                    <>
                        <div id="login_container" class="card">
                            <div className="card-body m-4">

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
                                    <input type="password" name="password" id="password" className="form-control"/>

                                    <input type="submit" value="Login" className="btn btn-dark mt-4 form-control"/>
                                </form>

                                <p className="mt-2">Don't have an account? <a href="#">Sign up</a></p>
                            </div>
                        </div>
                    </>
            );
}