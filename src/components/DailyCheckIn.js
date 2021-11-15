import React, { useState } from 'react';
import {useAppContext} from '../libs/contextLib';
import {Smile,Frown,Eh} from '../Icons';
import {saveDay} from '../libs/apiLib';
import {onError} from '../libs/errorLib';

import "./DailyCheckIn.css";

export default function DailyCheckIn(){
    const {colorScheme, today} = useAppContext();
    let happ = 1;
    let excit = 1;
    let note = "";
    if(today.checkInMini){
        happ = today.checkInMini.happiness;
        excit = today.checkInMini.excitement;
        note = today.checkInMini.notes
    }
    const [happy, setHappy] = useState(happ);
    const [excite, setExcite] = useState(excit);
    const [notes, setNotes] = useState(note);
    function hasChanged() {
        if(today.checkInMini){
            if(
                happy !== today.checkInMini.happiness ||
                excite !== today.checkInMini.excitement ||
                notes !== today.checkInMini.notes
            ) {
                return true;
            } else {return false}
        } else {
            if(
                happy !== 1 ||
                excite !== 1 ||
                notes !== ""
            ){
                return true;
            } else {return false}
        }

    }

    function resetDay() {
        setHappy(today.checkInMini.happiness);
        setExcite(today.checkInMini.excitement);
        setNotes(today.checkInMini.notes);
    }

    async function updateDay(){
        const id = today.checkInId;
        const updated = {
            'date': id,
            'cat1': today.cat1,
            'cat2': today.cat2,
            'cat3': today.cat3,
            'cat4': today.cat4,
            'cat5': today.cat5,
            'trophy': today.trophy,
            'checkInMini': {
                'happiness': happy,
                'excitement': excite,
                'notes': notes   
            }
        };
        try {
            await saveDay(updated);
            window.location.reload();
            return false;
        } catch(e){
            onError(e);
        }
    }

    return(
        <div className='daily-checkin-container'>
            <div className='dc-header'><h3>How'd Your Day Go?</h3></div>
            <div className='dc-three-btn'>
                <button onClick={() => setHappy(3)} style={(happy === 3) ? {boxShadow: '0px 3px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} className='three-btn'>{Smile()}</button>
                <button onClick={() => setHappy(2)}  style={(happy === 2) ? {boxShadow: '0px 3px 0px 2px rgba(0, 0, 0, 0.2)'} : {}}  className='three-btn'>{Eh()}</button>
                <button onClick={() => setHappy(1)}  style={(happy === 1) ? {boxShadow: '0px 3px 0px 2px rgba(0, 0, 0, 0.2)'} : {}}  className='three-btn'>{Frown()}</button>
            </div>
            <div className='dc-header'><h3>Excited For Tomorrow?</h3></div>
            <div className='dc-three-btn'>
                <button onClick={() => setExcite(3)} style={(excite === 3) ? {boxShadow: '0px 3px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} className='three-btn'>{Smile()}</button>
                <button onClick={() => setExcite(2)}  style={(excite === 2) ? {boxShadow: '0px 3px 0px 2px rgba(0, 0, 0, 0.2)'} : {}}  className='three-btn'>{Eh()}</button>
                <button onClick={() => setExcite(1)}  style={(excite === 1) ? {boxShadow: '0px 3px 0px 2px rgba(0, 0, 0, 0.2)'} : {}}  className='three-btn'>{Frown()}</button>
            </div>
            <div className='dc-header'><h3>Any Notes?</h3></div>
            <textarea className='notes-area' value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            <div className='btn-row'>
                <button className='save-btn' onClick={() => {updateDay()}} style={(hasChanged()) ? {backgroundColor: colorScheme.focus} : {display: 'none'}}>Update</button>
                <button className='save-btn' onClick={() => {resetDay()}} style={(hasChanged()) ? {backgroundColor: colorScheme.darker} : {display: 'none'}}>Undo</button>
            </div>
        </div>
    )
}