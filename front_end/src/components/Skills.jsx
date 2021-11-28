import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../css/Skills.css';

export default function Skills({user_id, updateView, width}){

    const [my_data, setData] = useState([]);

    useEffect(()=>{
        let route = `https://jobtracker467.uc.r.appspot.com/jobapps/users/${user_id}/skills`

        const setMyData = (skill) => {
            setData(prev => [...prev, {name: skill[0], amount: skill[1]}])
        }

        const getSkills = async () => {
            try {
                var res = await axios.get(route);
                //clear data
                setData([]);
                (Object.entries(res.data)).map(skill => setMyData(skill));

            } catch (error) {
                console.log(error);
            }
        }
        getSkills();
    }, [updateView, user_id]);

    let style = {
            height: '1px',
            width: '92%',
            color: 'black',
            'marginLeft': 'auto',
            'marginRight': 'auto'
    }

    let my_width = width/2;
    let chart_width;
    if(width > 700){
        chart_width = my_width - 100;
    } else {
        chart_width = width - 100;
    }

    return(
        <>

            <div className="dashboard_element_wrapper">
                <h1 className="display-6 mt-4 mb-4" id="skills_title">Skills</h1>
                <hr style={style}/>
                
                <div id="skills_canvas">
                    { (my_data.length !== 0) &&
                
                                <div id="chart_container">
                                    <BarChart
                                    layout="horizontal"
                                    width={chart_width}
                                    height={chart_width-200}
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
                        }
                    </div>
            </div>
                    
                    
        </>
    );

}