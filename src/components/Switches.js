import React, { useState } from 'react';
import { useAppContext } from "../libs/contextLib";
import {Times, Check} from "../Icons";
import './Switches.css';
import LoaderButton from './LoaderButton';
import {saveDay} from '../libs/apiLib';
import { onError } from '../libs/errorLib';

export default function Switches() {
    const {colorScheme, today, report} = useAppContext();
    const name1 = today.cat1.cat;
    const name2 = today.cat2.cat;
    const name3 = today.cat3.cat;
    const name4 = today.cat4.cat;
    const name5 = today.cat5.cat;
    const [cat1, set1] = useState(today.cat1.val);
    const [cat2, set2] = useState(today.cat2.val);
    const [cat3, set3] = useState(today.cat3.val);
    const [cat4, set4] = useState(today.cat4.val);
    const [cat5, set5] = useState(today.cat5.val);
    const [trophy, setTrophy] = useState(today.trophy.val);
    const [submitting, setSubmitting] = useState(false);
    const warn1 = getCatColor(name1);
    const warn2 = getCatColor(name2);
    const warn3 = getCatColor(name3);
    const warn4 = getCatColor(name4);
    const warn5 = getCatColor(name5);

    function hasChanged(){
        if(
            cat1 !== today.cat1.val ||
            cat2 !== today.cat2.val ||
            cat3 !== today.cat3.val ||
            cat4 !== today.cat4.val ||
            cat5 !== today.cat5.val ||
            trophy !== today.trophy.val
        ) {
            return true;
        } else {
            return false;
        }
    }

    function getCatColor(cat){
        const length = report.length;
        for(let i = 0; i < length; i++){
            const el = report[i];
            if(cat === el.cat && el.avg <= el.goal){
                return true;
            }
        }
        return false;
    }

    function mapSwitchValues(){
        return(
            <>
            <div className='switch' key={name1} >
                <h6 className='switch-category' style={(warn1) ? {backgroundColor: colorScheme.warn, color: 'white'} : {backgroundColor: null}}>{name1}</h6>
                <button className='switch-button' style={(cat1 !== today.cat1.val) ? {boxShadow: '0px 4px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} onClick={() => set1(!cat1)}>{(cat1) ? Check() : Times()}</button>
            </div>
            <div className='switch' key={name2}>
                <h6 className='switch-category' style={(warn2) ? {backgroundColor: colorScheme.warn, color: 'white'} : {backgroundColor: null}}>{name2}</h6>
                <button className='switch-button' style={(cat2 !== today.cat2.val) ? {boxShadow: '0px 4px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} onClick={() => set2(!cat2)}>{(cat2) ? Check() : Times()}</button>
            </div>
            <div className='switch' key={name3}>
                <h6 className='switch-category' style={(warn3) ? {backgroundColor: colorScheme.warn, color: 'white'} : {backgroundColor: null}}>{name3}</h6>
                <button className='switch-button' style={(cat3 !== today.cat3.val) ? {boxShadow: '0px 4px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} onClick={() => set3(!cat3)}>{(cat3) ? Check() : Times()}</button>
            </div>
            <div className='switch' key={name4}>
                <h6 className='switch-category' style={(warn4) ? {backgroundColor: colorScheme.warn, color: 'white'} : {backgroundColor: null}}>{name4}</h6>
                <button className='switch-button' style={(cat4 !== today.cat4.val) ? {boxShadow: '0px 4px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} onClick={() => set4(!cat4)}>{(cat4) ? Check() : Times()}</button>
            </div>
            <div className='switch' key={name5}>
                <h6 className='switch-category' style={(warn5) ? {backgroundColor: colorScheme.warn, color: 'white'} : {backgroundColor: null}}>{name5}</h6>
                <button className='switch-button' style={(cat5 !== today.cat5.val) ? {boxShadow: '0px 4px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} onClick={() => set5(!cat5)}>{(cat5) ? Check() : Times()}</button>
            </div>            
            <div className='switch' key="Trophy">
                <h6 className='switch-category'>Trophy</h6>
                <button className='switch-button' style={(trophy !== today.trophy.val) ? {boxShadow: '0px 4px 0px 2px rgba(0, 0, 0, 0.2)'} : {}} onClick={() => setTrophy(!trophy)}>{(trophy) ? Check() : Times()}</button>
            </div>
            </>
        )
    }

    function resetDay(){
        set1(today.cat1.val);
        set2(today.cat2.val);
        set3(today.cat3.val);
        set4(today.cat4.val);
        set5(today.cat5.val);
        setTrophy(today.trophy.val);
    }

    async function handleSubmit(){
        setSubmitting(true);
        try{
            await saveDay({
                'cat1': {
                    'cat': 'Mind',
                    'val': cat1
                },
                'cat2': {
                    'cat': 'Body',
                    'val': cat2
                },
                'cat3': {
                    'cat': 'Social',
                    'val': cat3
                },
                'cat4': {
                    'cat': 'Mindfulness',
                    'val': cat4
                },
                'cat5': {
                    'cat': 'Me Time',
                    'val': cat5
                },
                'trophy': {
                    'cat': 'Trophy',
                    'val': trophy
                },
                'date': today.checkInId
            });
        } catch(e){
            onError(e);
        } finally {
            window.location.reload();
            return false;
        }
    }

    function renderSwitches(){
        return (
            <div className='switches-container'>
                <h3 className='switches-header'>Today: {today.checkInId}</h3>
                <div className='switches-row'>
                    {mapSwitchValues()}
                    <LoaderButton isLoading={submitting} className='save-button' onClick={() => {handleSubmit()}} style={(hasChanged()) ? {backgroundColor: colorScheme.focus} : {display: 'none'}}>Update</LoaderButton>
                    <button className='save-button' onClick={() => {resetDay()}} style={(hasChanged()) ? {backgroundColor: colorScheme.darker} : {display: 'none'}}>Undo</button>
                </div>
            </div>
        )
    }

    function renderLander(){
        return(<div className='switches-container'><h3>Loading...</h3></div>)
    }

    return(
        ((today === "") ? renderLander() : renderSwitches())
    )
}