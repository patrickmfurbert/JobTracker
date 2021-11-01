import React, {useState, useEffect} from 'react';
import JOB_APP from './Job_App.jsx';
import '../css/Current_Apps.css';
import axios from 'axios';


export default function Current_Apps({user_id}){

        let route = `http://localhost:5000/users/${user_id}/jobapps`;

        const [apps, setApps] = useState([]);

        useEffect(async ()=>{
            try {
                 var res = await axios.get(route);
                 console.log(res);
                 setApps(res.data);

            } catch (error) {
                console.log(error);

            }
        }, []);

        return(

                <>
                    {/* Canvas for Current Apps */}

                    <div id="current_apps_canvas">

                        {/* {my_array.map(()=><JOB_APP/>)} */}

                        {
                        apps.map( app => (
                            <JOB_APP key={app._id} user_id={app.user_id} company={app.company} role={app.role} application_date={app.application_date} location={app.location} description={app.description}/>
                        ))
                        }
                    </div>
                </>

        );

}