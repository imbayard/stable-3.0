import React from 'react';
import { useAppContext } from "./libs/contextLib";
import {FaTimes, FaCheck, FaRegGrinStars, FaRegFlushed, FaRegGrimace} from 'react-icons/fa';

import "./Icons.css";
export function Times(){
    const {colorScheme} = useAppContext();
    return(
        <FaTimes style={{color: colorScheme.fail}} size='auto'/>
    )
}

export function Check(){
    const {colorScheme} = useAppContext();
    return(
        <FaCheck style={{color: colorScheme.success}} size='auto'/>
    )
}

export function Smile(){
    const {colorScheme} = useAppContext();
    return(
        <FaRegGrinStars style={{color: colorScheme.success}} size='auto'/>
    )
}

export function Frown(){
    const {colorScheme} = useAppContext();
    return(
        <FaRegFlushed style={{color: colorScheme.fail}} size='auto'/>
    )
}

export function Eh(){
    const {colorScheme} = useAppContext();
    return(
        <FaRegGrimace style={{color: colorScheme.dark}} size='auto'/>
    )
}

export function Spinner(){
    return(
        <div class="spinner-border text-primary main" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    )
}