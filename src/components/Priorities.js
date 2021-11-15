import React, { useState } from 'react';
import Priority from "./Priority";
import {useAppContext} from "../libs/contextLib";
import {onError} from "../libs/errorLib";
import {setPriorities} from "../libs/apiLib";

import "./Priorities.css";

export default function Priorities(){
    const {colorScheme, priorities} = useAppContext();
    const [cat1, setCat1] = useState(priorities.cat1);
    const [cat2, setCat2] = useState(priorities.cat2);
    const [cat3, setCat3] = useState(priorities.cat3);
    const [cat4, setCat4] = useState(priorities.cat4);
    const [cat5, setCat5] = useState(priorities.cat5);

    const ps = [cat1, cat2, cat3, cat4, cat5];
    const ps_sorted = ps.sort((a,b) => a.p - b.p);

    function changeG(goal) {

        switch(goal.cat){
            case "mind":
                setCat1({'cat': goal.cat, 'p': cat1.p, 'g': goal.val});
                break;
            case "body":
                setCat2({'cat': goal.cat, 'p': cat2.p, 'g': goal.val});
                break;
            case "social":
                setCat3({'cat': goal.cat, 'p': cat3.p, 'g': goal.val});
                break;
            case "mindful":
                setCat4({'cat': goal.cat, 'p': cat4.p, 'g': goal.val});
                break;
            case "me time":
                setCat5({'cat': goal.cat, 'p': cat5.p, 'g': goal.val});
                break;
            default:
                return;
        }
    }

    function changeP(goal) {
        switch(goal.cat){
            case "mind":
                setCat1({'cat': goal.cat, 'p': goal.val, 'g': cat1.g});
                break;
            case "body":
                setCat2({'cat': goal.cat, 'p': goal.val, 'g': cat2.g});
                break;
            case "social":
                setCat3({'cat': goal.cat, 'p': goal.val, 'g': cat3.g});
                break;
            case "mindful":
                setCat4({'cat': goal.cat, 'p': goal.val, 'g': cat4.g});
                break;
            case "me time":
                setCat5({'cat': goal.cat, 'p': goal.val, 'g': cat5.g});
                break;
            default:
                return;
        }
    }

    async function handleSubmit() {
        let priorities = [];
        const list = ps.sort((a,b) => a.p - b.p);
        for(let i = 0; i < ps.length; i++){
            const p = list[i];
            if(p.p > 5 || p.p < 1) {
                onError(p.cat + " importance may not exceed 5 or be lower than 1.");
                return;
            } else if (p.g > 7 || p.g < 1) {
                onError(p.cat + " goal may not exceed 7 or be lower than 1");
                return;
            }
            priorities.push(p.p);
        }
        if(JSON.stringify(priorities) !== JSON.stringify(['1', '2', '3', '4', '5'])){
            onError("Importance values must be 1 through 5 with no duplicates");
            return;
        }
        try {
            await setPriorities({'cat1': cat1, "cat2": cat2, 'cat3': cat3, "cat4": cat4, 'cat5': cat5});
            window.location.reload();
        } catch(e){
            onError(e);
        }
    }

    function hasChanged() {
        if(
            cat1 !== priorities.cat1 ||
            cat2 !== priorities.cat2 ||
            cat3 !== priorities.cat3 ||
            cat4 !== priorities.cat4 ||
            cat5 !== priorities.cat5
        ){
            return true;
        } else {
            return false;
        }
    }

    function reset(){
        setCat1(priorities.cat1);
        setCat2(priorities.cat2);
        setCat3(priorities.cat3);
        setCat4(priorities.cat4);
        setCat5(priorities.cat5);
    }
    return(
        <div className='priorities-container'>
            <div className='p-header'><h3>Priorities</h3></div>
            <div className='p-form'>
                {ps_sorted.map((p) => {
                    return(<Priority 
                        key={p.cat}
                        p = {p.cat}
                        pVal = {p.p}
                        gVal = {p.g}
                        pColor = "white"
                        changeP = {changeP}
                        changeG = {changeG}
                    />)
                })}
            </div>
            <div style={(hasChanged()) ? {display: 'block'} : {display: 'none'}} className='button-row'>
                <button className='sv-btn' onClick={() => handleSubmit()} style={{backgroundColor: colorScheme.focus}}>Update</button>
                <button className='sv-btn' onClick={() => reset()} style={{backgroundColor: colorScheme.darker}}>Undo</button>
            </div>
        </div>
    )
}