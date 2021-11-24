import React, { useState } from 'react';
import Switches from '../components/Switches';
import DailyReport from '../components/DailyReport';
import DailyCheckIn from '../components/DailyCheckIn';
import { useAppContext } from "../libs/contextLib";
import Fade from "../components/animations/Fade";
import Priorities from "../components/Priorities";
import { useHistory } from "react-router-dom";

import "./Home.css";
import Welcome from './Welcome';

export default function Home() {
    const {colorScheme, isAuthenticated, priorities} = useAppContext();
    const [isDailyCheckInOpen, setDailyCheckInOpen] = useState(false);
    const [isPrioritiesOpen, openPriorities] = useState(false);
    const history = useHistory();
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
    function renderLander(){
        return(
            <div>Must Log In / Sign Up</div>
        )
    }
    function renderHome(){
        return(
            <div className="container-wrapper">
                <Fade>
                <span style={{backgroundColor: colorScheme.main}} className='container-header'><h1>Home Page</h1></span>
                <span className='main-view-right' style={{borderColor: colorScheme.main}}>
                    <button className='buttons' style={{backgroundColor: colorScheme.main, color: 'white'}} onClick={() => setDailyCheckInOpen(!isDailyCheckInOpen)}>Check-In</button>
                    {renderCheckInContainer()}
                    <button className='buttons' style={{backgroundColor: colorScheme.main, color: 'white'}} onClick={() => history.push("/history")}>History</button>
                    <button className='buttons' style={{backgroundColor: colorScheme.main, color: 'white'}} onClick={() => openPriorities(!isPrioritiesOpen)}>Set Priorities</button>
                    {renderPriorities()}
                </span>
                <span className='main-view-left'>
                    <span className='top-view'>
                        <Switches />
                    </span>
                    <span className='bottom-view'>
                        <DailyReport />
                    </span>
                </span>
                </Fade>
            </div>
        )
    }

    function renderWelcome() {
        return (
            <Welcome />
        )
    }

    function welcome() {
        return((priorities !== "") ? renderHome() : renderWelcome());
    }

    return((isAuthenticated) ? welcome() : renderLander());
    
}