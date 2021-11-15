import React, { useState } from 'react';
import Switches from '../components/Switches';
import DailyReport from '../components/DailyReport';
import DailyCheckIn from '../components/DailyCheckIn';
import { useAppContext } from "../libs/contextLib";
import Fade from "../components/animations/Fade";
import Priorities from "../components/Priorities";

import "./Home.css";

export default function Home() {
    const {colorScheme} = useAppContext();
    const [isDailyCheckInOpen, setDailyCheckInOpen] = useState(false);
    const [isPrioritiesOpen, openPriorities] = useState(false);

    function renderCheckInContainer(){
        if(isDailyCheckInOpen){
            return(
                <DailyCheckIn />
            )
        } else { return(<></>) }
    }
    function renderPriorities(){
        if(isPrioritiesOpen){
            return(
                <Priorities />
            )
        } else { return(<></>) }
    }

    return(
        <div className='container' style={{backgroundColor: colorScheme.dark}}>
                <h1 className='container-header' style={{backgroundColor: colorScheme.main}}>Home Page</h1>
                <Fade>
                <span className='main-view-left'>
                    <span className='top-view'>
                        <Switches />
                    </span>
                    <span className='bottom-view'>
                        <DailyReport />
                    </span>
                </span>
                <span className='main-view-right' style={{borderLeft: '1px solid', borderColor: colorScheme.main}}>
                    <button className='buttons' style={{backgroundColor: colorScheme.main, color: 'white'}} onClick={() => setDailyCheckInOpen(!isDailyCheckInOpen)}>Record Daily Check-In</button>
                    {renderCheckInContainer()}
                    <button className='buttons' style={{backgroundColor: colorScheme.main, color: 'white'}}>Analyze History</button>
                    <button className='buttons' style={{backgroundColor: colorScheme.main, color: 'white'}} onClick={() => openPriorities(!isPrioritiesOpen)}>Set Priorities</button>
                    {renderPriorities()}
                </span>
                </Fade>
        </div>
    )
}