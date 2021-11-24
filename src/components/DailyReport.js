import React from 'react';
import {useAppContext} from '../libs/contextLib';

import "./DailyReport.css";

export default function DailyReport() {
    const {colorScheme, report} = useAppContext();

    function renderReport(){
        if(report !== "NO RECENT"){
            return(
                <div className='report-container'>
                    <div className='focus'>
                        <div className='focus-label'><h3>Today's Focus</h3></div>
                        <div className='focus-category' style={{backgroundColor: colorScheme.focus}}><h3>{report[0].cat}</h3></div>
                    </div>
                    <div className='focus'>
                        <h3 className='focus-label'>Lowest Priority Today</h3>
                        <div className='focus-category' style={{backgroundColor: colorScheme.darkest}}><h3>{report[4].cat}</h3></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='report-container' style={{backgroundColor: colorScheme.warn}}>
                    <h1 style={{color: 'white', padding: '5% 5% 5% 5%'}}>Record your first check in using the switches above to unlock your daily report.</h1>
                </div>
            )
        }

    }

    function renderLander(){
        <div className='report-container'>
            <h1>You have no recent check ins.</h1>
        </div>
    }

    return(
        <>
            {(report !== null) ? renderReport() : renderLander()}
        </>
        )
}