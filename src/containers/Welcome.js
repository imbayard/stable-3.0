import React, { useState } from 'react';
import { useAppContext } from "../libs/contextLib";
import WelcomePages from "../components/WelcomePages";

import "./Welcome.css";

export default function Welcome() {
    const [page, setPage] = useState(0);
    const {colorScheme} = useAppContext();
    const pageCount = 3;

    function handleClick(val){
        setPage(page + val);
    }


    return (
        <div className='container' style={{borderColor: colorScheme.darker}}>
            <h1 className='container-header' style={{backgroundColor: colorScheme.main}}>Welcome!</h1>
            <div className='welcome-button-row'>
                <button className='arrow-btn' onClick={() => handleClick(-1)} style={(page !== 0) ? {backgroundColor: colorScheme.fail} : {display: 'none'}}>{"<--"}</button>
                <button className='arrow-btn' onClick={() => handleClick(1)} style={(page !== pageCount) ? {backgroundColor: colorScheme.success} : {display: 'none'}}>{"-->"}</button>
            </div>
            <WelcomePages
                page={page}
                colorScheme={colorScheme}
            />
        </div>
    )
}