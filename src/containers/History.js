import React from 'react';
import {useAppContext} from '../libs/contextLib';

import "./History.css";

export default function History() {
    const {report, colorScheme} = useAppContext();
    const isReportNull = (report === "");
    console.log(report);
    const size0 = getSize(report[0]);
    const size1 = getSize(report[1]);
    const size2 = getSize(report[2]);
    const size3 = getSize(report[3]);
    const size4 = getSize(report[4]);

    function getSize(cat){
        const val = cat.avg * 100;
        var ret = (Math.round(val * 100) / 100).toFixed(0);
        const str = ret.toString();
        if(ret < 40){
            ret = 40;
        }
        const size = ret.toString();
        const out = {
            'sizing': (size + "%"),
            'str': (str + "%")
        }
        return out;
    }
    
    function renderHistory(){
        return(
            <div className='history'>
                <h1 className='history-header' style={{backgroundColor: colorScheme.main}}>History</h1>
                <p className='history-tip'>Hover over / tap a bar to see your weekly averages.</p>
                <div className='history-circles-container'>
                    <span className='history-circles'>
                        <div className='circle'><div style={{width: size0.sizing, backgroundColor: colorScheme.warn}} className='circle-value grow'>{report[0].cat} Average: {size0.str}</div></div>
                        <div className='circle'><div style={{width: size1.sizing, backgroundColor: colorScheme.fadedWarn}} className='circle-value grow'>{report[1].cat} Average: {size1.str}</div></div>
                        <div className='circle'><div style={{width: size2.sizing, backgroundColor: colorScheme.darkest}} className='circle-value grow'>{report[2].cat} Average: {size2.str}</div></div>
                        <div className='circle'><div style={{width: size3.sizing, backgroundColor: colorScheme.darker}} className='circle-value grow'>{report[3].cat} Average: {size3.str}</div></div>
                        <div className='circle'><div style={{width: size4.sizing, backgroundColor: colorScheme.success}} className='circle-value grow'>{report[4].cat} Average: {size4.str}</div></div>
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