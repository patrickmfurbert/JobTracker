import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap'
import '../css/Contacts.css';
import axios from 'axios';


export default function Contacts({user_id}) {

    const [apps, setApps] = useState([]);


    useEffect(()=>{

        // route for getting job apps
        let route = `https://jobtracker467.uc.r.appspot.com/jobapps/users/${user_id}`;

        const getApps = async () => {
            try {
                var res = await axios.get(route);
                (res.data).map(data =>{
                    if(Array.isArray(data.contacts) && (data.contacts.length !== 0)){
                        (data.contacts).map( my_contact => {
                                console.log("adding contacts");
                                setApps(prev => [...prev, my_contact])
                            }
                        )
                    }
                })
                // setApps(res.data);
                console.log(res.data);
           } catch (error) {
               console.log(error);
           }
        }
        
        getApps();
    
    }, [user_id]);

    let style = {
        height: '1px',
        width: '92%',
        color: 'black',
        'marginLeft': 'auto',
        'marginRight': 'auto'
    }

    return(
        <>
                    {/*  */}
                    <div className="dashboard_element_wrapper">
                        <h1 className="display-6 mt-4 mb-4" id="contacts_title">Contacts</h1>
                        <hr style={style}/>

                        <div className="contacts_canvas">

                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        apps.map( (contacts, index) => 
                                            {
                                                return (
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{contacts.name}</td>
                                                        <td>{contacts.role}</td>
                                                        <td>{contacts.email}</td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>

                    </div>
        </>
    );
}