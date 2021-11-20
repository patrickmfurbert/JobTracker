import React, {useState, useEffect} from 'react';
import JOB_APP from './Job_App.jsx';
import '../css/Current_Apps.css';
import axios from 'axios';


export default function Current_Apps({user_id}){

        // route for getting job apps
        // let route = `http://149.28.113.234:5000/users/${user_id}/jobapps`;

        const [apps, setApps] = useState([]);
        const [malEffect, setMalEffect] = useState(true)

        const updateApps = () => {
            setMalEffect(!malEffect);
        }

        useEffect(()=>{

            // route for getting job apps
            let route = `https://jobtracker467.uc.r.appspot.com/jobapps/users/${user_id}`;

            const getApps = async () => {
                try {
                    var res = await axios.get(route);
                    console.log("getting current apps")
                    console.log(res);
                    setApps(res.data);
    
               } catch (error) {
                   console.log(error);
    
               }
            }
            
            getApps();
        
        }, [user_id, malEffect]);


        let style = {
            // style="height:2px; width:50%; border-width:0; color:red; background-color:red"
            height: '1px',
            width: '92%',
            color: 'black',
            'margin-left': 'auto',
            'margin-right': 'auto'
        }

        return(

                <>
                    {/* Canvas for Current Apps */}

                     <h1 className="display-6 mt-4 mb-4" id="current_apps_title">Current Applications</h1>
                     <hr style={style}/>

                    <div id="current_apps_canvas">


                        {
                        apps.map( app => (
                            <JOB_APP key={app.id} app_id={app.id} user_id={app.user_id} company={app.company} role={app.role} application_date={app.application_date} location={app.location} description={app.description} skills={app.skills} contacts={app.contacts} updateMal={updateApps}/>
                        ))
                        }
                    </div>
                </>

        );

}