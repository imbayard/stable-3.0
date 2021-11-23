import React from 'react';
import {openingP, firstP, secondP} from "../libs/welcomeLib";
import Fade from "../components/animations/Fade";
import Priorities from "../components/Priorities";

export default function Pages({
    page,
    colorScheme,
    ...props
}){

    function opening() {
        return (
            <Fade>
                <div className='quote' style={{borderColor: colorScheme.darker, color: colorScheme.main}}>
                    <p>{openingP}</p>
                </div>
            </Fade>
        )
    }

    function first() {
        return (
            <Fade>
                <div className='first'>
                    {firstP.map((p) => {
                        return (
                            <p className='paragraph' style={{color: colorScheme.main}} key={p[0]}>{p}</p>
                        )
                    })}
                </div>
            </Fade>

        )
    }

    function second() {
        return (
            <Fade>
                <div className='first' style={{color: colorScheme.main}}>
                    <p className='paragraph'>{secondP.first}</p>
                    <div className='five-areas'>
                        <p className='five-label'>{secondP.second}</p>
                        <div className='the-five'>
                            {secondP.five.map((area) => {
                                return(
                                    <p style={{backgroundColor: colorScheme.darker, color: 'white'}} className='welcome-focus-area' key={area}>{area}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Fade>
        )
    }

    function third() {
        return (
            <div className='first'>
                <Priorities welcome={true}/>
            </div>

        )
    }

    switch(page) {
        case 0:
            return opening();
        case 1:
            return first();
        case 2:
            return second();
        case 3: 
            return third();
        default:
            return opening();
    }
}