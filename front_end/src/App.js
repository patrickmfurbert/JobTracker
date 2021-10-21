import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import { useState } from 'react';
import './css/App.css';

export default function App() {

  const [displayLogin, setDisplayLogin] = useState(true)



  const showRegistration = () => {
    setDisplayLogin(false);
  }

  return (
      <>
        <div id="app_container">
                  {displayLogin && <Login signup={()=>showRegistration}/>}
                  {!displayLogin && <Registration/>}
        </div>
      </>
  );
}

