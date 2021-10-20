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
                        <div id="login_container">
                            <form onSubmit={handleSubmit(submit)}>
                            </form>

                            <h1>Whats up</h1>
                        </div>
                    </>
            );
}