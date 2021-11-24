import React from 'react';
import {useAppContext} from '../libs/contextLib';

import "./History.css";

export default function History() {
    const {report, colorScheme} = useAppContext();
    const isReportNull = (report === "");
    console.log(report);
    const size0 = getSize(report[0].avg);
    const size1 = getSize(report[1].avg);
    const size2 = getSize(report[2].avg);
    const size3 = getSize(report[3].avg);
    const size4 = getSize(report[4].avg);

    function getSize(average){
        const val = average * 1;
        const percent = val * 100;
        const str = percent.toString();
        return str + "%";
    }
    
    function renderHistory(){
        return(
            <div className='history'>
                <h1 className='history-header' style={{backgroundColor: colorScheme.main}}>History</h1>
                <p className='history-tip'>Hover over / tap a bar to see your weekly averages.</p>
                <div className='history-circles-container'>
                    <span className='history-circles'>
                        <div className='circle'><div style={{width: size0, backgroundColor: colorScheme.warn}} className='circle-value grow'>{report[0].cat} Average: {size0}</div></div>
                        <div className='circle'><div style={{width: size1, backgroundColor: colorScheme.fadedWarn}} className='circle-value grow'>{report[1].cat} Average: {size1}</div></div>
                        <div className='circle'><div style={{width: size2, backgroundColor: colorScheme.darkest}} className='circle-value grow'>{report[2].cat} Average: {size2}</div></div>
                        <div className='circle'><div style={{width: size3, backgroundColor: colorScheme.darker}} className='circle-value grow'>{report[3].cat} Average: {size3}</div></div>
                        <div className='circle'><div style={{width: size4, backgroundColor: colorScheme.success}} className='circle-value grow'>{report[4].cat} Average: {size4}</div></div>
                    </span>
                </div>
            </div>
        );
    }
    
    function renderEmpty() {
        return (
            <div className='history'>
                <h1 className='history-header' style={{backgroundColor: colorScheme.main}}>Looks like you haven't completed a check-in yet.</h1>
                <p className='history-message'>Try recording a check-in by clicking one of the red Xs on the home page.</p>
            </div>
        )
    }

    return(
        <div className='history-container'>
            {(isReportNull) ? renderEmpty() : renderHistory()}
        </div>
    )
}