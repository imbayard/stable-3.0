import React from 'react';
import {useAppContext} from '../libs/contextLib';

import "./DailyReport.css";

export default function DailyReport() {
    const {colorScheme, report} = useAppContext();

    function renderReport(){
        return(
            <div className='report-container'>
                <div className='focus'>
                    <h3 className='focus-label'>Today's Focus</h3>
                    <div className='focus-category' style={{backgroundColor: colorScheme.focus}}><h3>{report[0].cat}</h3></div>
                </div>
            </div>
        )
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