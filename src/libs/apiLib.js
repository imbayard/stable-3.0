import { API } from "aws-amplify";

/**********************************
SETTINGS: POST REQUEST
Saves user's settings
**********************************/
export function saveSettings(settings){
    return API.post("stable-2", "/settings/submit", {
        body: settings
    });
}
/**********************************
SETTINGS: GET REQUEST
Gets user's settings
**********************************/
export function getSettings(){
    return API.get("stable-2", "/settings/get");
}

/**********************************
TODAY: POST REQUEST
Saves user's day
**********************************/
export function saveDay(today){
    return API.post("stable-2", "/today/set", {
        body: today
    });
}
/**********************************
TODAY: GET REQUEST
Gets user's day
**********************************/
export function getDay(id){
    return API.get("stable-2", `/today/get/${id}`);
}

/**********************************
DAILY REPORT: GET REQUEST
Gets user's daily report
**********************************/
export function getDailyReport(){
    return API.get("stable-2", `/today/report`);
}

/**********************************
PRIORITIES: POST REQUEST
Saves user's priorities
**********************************/
export function setPriorities(body){
    return API.post("stable-2", '/priorities/set', 
        {body: body}
    )
}
/**********************************
PRIORITIES: GET REQUEST
Gets user's priorities
**********************************/
export function getPriorities(){
    return API.get("stable-2", '/priorities/get')
}