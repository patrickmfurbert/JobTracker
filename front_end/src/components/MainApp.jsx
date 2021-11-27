import React from 'react';
import MOBILEVIEW from './MobileView.jsx';
import DESKTOPVIEW from './DesktopView.jsx';
import useWindowSize from '../utils/useWindowSize.jsx';


export default function MainApp({user_id, signup}){

        const { width } = useWindowSize();
        const desktop = width > 1200 ? true : false;

        return(

                <>
                    {(desktop) ? <DESKTOPVIEW user_id={user_id} signup={signup} width={width}/> : <MOBILEVIEW user_id={user_id} signup={signup}/>}
                </>

        );

}