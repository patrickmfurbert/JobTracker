import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../css/Skills.css';

export default function Skills({user_id}){

    // const [skills, setSkills] = useState([]);
    const [my_data, setData] = useState([]);

    useEffect(()=>{
        let route = `https://jobtracker467.uc.r.appspot.com/jobapps/users/${user_id}/skills`

        const setMyData = (skill) => {
            setData(prev => [...prev, {name: skill[0], amount: skill[1]}])
        }

        const getSkills = async () => {
            try {
                var res = await axios.get(route);
                console.log("getting skills data");
                console.log(Object.entries(res.data));
                console.log("mapping");
                (Object.entries(res.data)).map(skill => setMyData(skill));

            } catch (error) {
                console.log(error);
            }
        }
        getSkills();
    }, []);

    return(
        <>
                    
                        { (my_data.length !== 0) &&
                        
                        <div id="chart_container">
                            <ResponsiveContainer width="50%" height="50%">
                            <BarChart
                              width={500}
                              height={300}
                              data={my_data}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="amount" fill="#8884d8" />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>
                                        }
                    
                    
        </>
    );

}