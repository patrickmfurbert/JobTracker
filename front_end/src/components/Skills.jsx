import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Skills({user_id}){

    const [skills, setSkills] = useState([]);



    useEffect(()=>{
        let route = `https://jobtracker467.uc.r.appspot.com/jobapps/users/${user_id}/skills`

        // const updateSkills = data => {
        //     setSkills( prev => [...prev, data]);
        // }

        const getSkills = async () => {
            try {
                var res = await axios.get(route);
                console.log("getting skills data");
                console.log(res);
                setSkills(Object.entries(res.data));
                // updateSkills(res.data)
            } catch (error) {
                console.log(error);
            }
        }


        getSkills();

    }, [user_id]);

    return(
        <>
            {(skills.length !== 0) && skills.map(skill => (<h1>{skill}</h1>))}
        </>
    );

}