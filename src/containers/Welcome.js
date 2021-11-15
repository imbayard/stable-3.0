import React from 'react';
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";

import "./Welcome.css";

export default function Welcome() {
    const history = useHistory();
    const {colorScheme} = useAppContext();
    
    function getStarted(){
        history.push("/set-settings");
    }

    return(
        <div className='container'>
                <h1 className='container-header' style={{backgroundColor: colorScheme.darker}}>Welcome!</h1>
                <div className='quote' style={{borderColor: colorScheme.darker, color: colorScheme.main}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </div>
                <div className='paragraph' style={{borderColor: colorScheme.darker}}></div>
                <div className='paragraph' style={{borderColor: colorScheme.darker}}></div>
                <div className='get-started'>
                    <button onClick={() => getStarted()} className='get-started-button' style={{backgroundColor: colorScheme.main, color: colorScheme.lighter}}>Get Started</button>
                </div>
        </div>
    )
}