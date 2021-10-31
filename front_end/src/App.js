import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import MainApp from './components/MainApp.jsx';
import React, { useState } from 'react';
import './css/App.css';

export default function App() {

  const [displayLogin, setDisplayLogin] = useState(true);
  const [displayApp, setDisplayApp] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const showRegistration = () => {
    setDisplayLogin(!displayLogin);
  }

  const showApp = () => {
    console.log('?');
    setDisplayApp(!displayApp);
  }

  const setUser = (user) => {
    console.log(user);
    setCurrentUser(user);
  }

  return (
      <>
        <div id="app_container">
                  {!displayApp && displayLogin && <Login signup={()=>showRegistration} loggedin={showApp} currentUser={setUser}/>}
                  {!displayApp && !displayLogin && <Registration signup={()=>showRegistration}/>}
                  {displayApp && <MainApp currentUser={currentUser}/>}
        </div>
      </>
  );
}

