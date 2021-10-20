import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/Login.css';
import axios from 'axios';


export default function Login() {

            const route = 'garbage';

            const {register, handleSubmit} = useForm();

            const submit = async data => {
                console.log(data);
            }


            return(
                    <>
                        <div id="login_container" class="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submit)}>
                                    <label htmlFor="username" className="form-label">username</label>
                                    <input type="text" name="username" id="username" className="form-control" />

                                    <label htmlFor="password" className="form-label">password</label>
                                    <input type="password" name="password" id="password" className="form-control"/>

                                    <input type="submit" value="Login" className="btn btn-dark mt-4 form-control"/>
                                </form>
                            </div>
                        </div>
                    </>
            );
}