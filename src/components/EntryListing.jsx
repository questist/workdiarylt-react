import React,{useState, useEffect, useRef, useCallback} from 'react'
import '../assets/scss/EntryListing.css'
import '../assets/scss/EntryDialog.css'
import EntryDialog from '../components/EntryDialog'
import {StatusEnum} from '../components/GlobalFunctions'

export default function EntryListing({entry,onClickEntry,isDialogOpen}) {
    let startTime = ""
    const text = useRef((entry.isPomodoro)?entry.start : entry.start.toLocaleTimeString() + " : " + entry.title)

    function setTitleText() {
            
        if(entry.status === StatusEnum.NOTSTARTED) {
            text.current = (entry.isPomodoro)?entry.start : "READY" + " : " + entry.title
        }
        else if(entry.status === StatusEnum.RUNNING || entry.status === StatusEnum.COMPLETED) {
            text.current = entry.start.toLocaleTimeString() + " : " + entry.title
        }
        else if(entry.status === StatusEnum.APPSTARTED) {
            let title = (entry.title === "Logging my activities")?"Welcome, Start your Work Diary Today":entry.title;
            text.current = entry.start.toLocaleTimeString() + " : " + title
        }
        else {
            throw new Error("EntryListing.setTitleText: Status should not found")
        }
        

    }
    /*
    function onClickCloseDialog(e) {
        entry.isDialogOpen = entry.isDialogOpen?false:true;
        setDialog(entry.isDialogOpen)
    }
    function entryOnClickEntry(e) {
        let titleLine = ""
        if(!entry.isPomodoro || entry.status == StatusEnum.COMPLETED) {
             let forString = (entry.status == StatusEnum.COMPLETED)?(" for " + entry.duration + " minutes"):""
             titleLine = "I felt like " + entry.title + " entries at " + entry.start.toLocaleTimeString() + forString
        }
        else {
            titleLine = "I will be " + entry.title + " for " + entry.duration + " minutes"
        }
        
        onClickEntry(e,entry)
    }
    useEffect(() => {
        entry.setTitleText()
    },[entry])*/
    setTitleText()
    function localOnClickEntry(e) {
        onClickEntry(e,entry)
    }
    
    let entryClass = ""
    if(entry.isPomodoro && entry.status === StatusEnum.NOTSTARTED) {
        entryClass = "entry-pomodoro"
    }
    else if(entry.status === StatusEnum.RUNNING) {
        entryClass = "entry-selected"
    }
    else {
        entryClass = "entry-unselected"
    }
    return (
        <React.Fragment>
            <div 
                className={"entry-listing " + entryClass} 
                onClick={localOnClickEntry} 
                id={entry.id}
                style={isDialogOpen?{borderBottom: "0"}:{}}>
                
                <h3>{text.current}</h3>
            </div>

            {isDialogOpen && <EntryDialog entry={entry} setTitleText={setTitleText} />}
        </React.Fragment>
    )
}
