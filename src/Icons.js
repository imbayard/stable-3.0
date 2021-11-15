import React from 'react';
import { useAppContext } from "./libs/contextLib";
import {FaTimes, FaCheck, FaRegGrinStars, FaRegFlushed, FaRegGrimace} from 'react-icons/fa';

export function Times(){
    const {colorScheme} = useAppContext();
    return(
        <FaTimes style={{color: colorScheme.fail}} size='100%'/>
    )
}

export function Check(){
    const {colorScheme} = useAppContext();
    return(
        <FaCheck style={{color: colorScheme.success}} size='100%'/>
    )
}

export function Smile(){
    const {colorScheme} = useAppContext();
    return(
        <FaRegGrinStars style={{color: colorScheme.success}} size='100%'/>
    )
}

export function Frown(){
    const {colorScheme} = useAppContext();
    return(
        <FaRegFlushed style={{color: colorScheme.fail}} size='100%'/>
    )
}

export function Eh(){
    const {colorScheme} = useAppContext();
    return(
        <FaRegGrimace style={{color: colorScheme.dark}} size='100%'/>
    )
}