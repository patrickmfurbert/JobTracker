import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from 'react-bootstrap';
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

    let style = {
            height: '1px',
            width: '92%',
            color: 'black',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }

    return(
        <>

            <h1 className="display-6 mt-4 mb-4" id="skills_title">Skills</h1>
            <hr style={style}/>
                    
            <div id="skills_canvas">
                { (my_data.length !== 0) &&
                
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Required Skills</Card.Title>
                            <div id="chart_container">
                                <BarChart
                                layout="horizontal"
                                width={600}
                                height={400}
                                data={my_data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                >
                                <CartesianGrid horizontal={false} vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false}/>
                                <Tooltip />
                                {/* <Legend /> */}
                                <Bar dataKey="amount" fill="#323834" />
                                </BarChart>
                            </div>
                        </Card.Body>
                    </Card>

                    }   
                </div>
                    
                    
        </>
    );

}