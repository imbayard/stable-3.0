import React, { useState, useEffect } from "react";
import LoaderButton from "../components/LoaderButton";
import {saveSettings} from "../libs/apiLib";
import {onError} from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";

import "./Settings.css";

export default function Settings(){

    const [theme, setTheme] = useState("earthy");
    const [submitTheme, setSubmitTheme] = useState("");
    const {settings, colorScheme} = useAppContext();
    const [saveLoading, setSaveLoading] = useState(false);
    
    useEffect(() => {
        onLoad();
    })
    async function onLoad(){
        await setTheme(settings.theme);
        console.log("Theme: " + theme);
    }

    function validateSubmit() {
        if(submitTheme === ""){
            return false;
        } else {
            return true;
        }
    }

    async function handleSubmit() {
        setSaveLoading(true);
        try {
            await saveSettings({'theme': submitTheme});
            setSubmitTheme("");
        } catch(e){
            onError(e);
        }
        setSaveLoading(false);
        window.location.reload();
        return false;
    }

    return (
        <div style={{backgroundColor: 'white'}} className='settings'>
            <h1 className='settings-header' style={{backgroundColor: colorScheme.darker}}>Settings</h1>
            <div className='change-theme-container'>
                <p className='label' style={{color: colorScheme.main}}>Theme</p>
                <div className="toggle-container">
                    <button style={{backgroundColor: '#749997'}} className='theme-btn' title="Earthy Mode" onClick={() => setSubmitTheme("earthy")}>Earthy</button>
                    <button style={{backgroundColor: 'whitesmoke'}} className='theme-btn' title="Clear Mode" onClick={() => setSubmitTheme("clear")}>Clear</button>
                </div>
            </div>
            <LoaderButton disabled={!validateSubmit()} isLoading={saveLoading} className='save-settings' style={{backgroundColor: colorScheme.focus}} onClick={() => handleSubmit()}>Save</LoaderButton>
        </div>
    )
}
      