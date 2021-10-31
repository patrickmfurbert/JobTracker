import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import MainApp from './components/MainApp.jsx';
import React, { useState } from 'react';
import './css/App.css';

export default function App() {

  const [displayLogin, setDisplayLogin] = useState(true);
  const [displayApp, setDisplayApp] = useState(false);

  const showRegistration = () => {
    setDisplayLogin(!displayLogin);
  }

  const showApp = () => {
    console.log('?');
    setDisplayApp(!displayApp);
  }

  return (
      <>
        <div id="app_container">
                  {!displayApp && displayLogin && <Login signup={()=>showRegistration} loggedin={showApp}/>}
                  {!displayApp && !displayLogin && <Registration signup={()=>showRegistration}/>}
                  {displayApp && <MainApp/>}
        </div>
      </>
  );
}

