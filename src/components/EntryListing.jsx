import React,{useState, useEffect} from 'react'
import '../assets/scss/EntryListing.css'
import {StatusEnum} from '../components/GlobalFunctions'

export default function EntryListing({entry,onClickEntry,options}) {
    let startTime = ""
    const [text,setText] = useState((entry.isPomodoro)?entry.start : entry.start.toLocaleTimeString() + " : " + entry.title)
    
    entry.setTitleText = function() {
        console.log(StatusEnum.NOTSTARTED + " is status")
        if(entry.status == StatusEnum.NOTSTARTED) {
            setText((entry.isPomodoro)?entry.start : "READY" + " : " + entry.title)
        }
        else if(entry.status === StatusEnum.RUNNING || entry.status === StatusEnum.COMPLETED) {
            setText(entry.start.toLocaleTimeString() + " : " + entry.title)
        }
        else if(entry.status === StatusEnum.APPSTARTED) {
            setText(entry.start.toLocaleTimeString() + " : " + "Welcome, Start your Work Diary Today")
        }
        else {
            throw new Error("EntryListing.setTitleText: Status should not found")
        }
    }
    useEffect(() => {
        entry.setTitleText()
    },[entry])
    if(notRunning ) return null
    return (
        <div 
            className={"entry-listing " + 
                ((entry.isPomodoro && entry.status === StatusEnum.NOTSTARTED && entry.selectedClass !== "entry-selected")?"entry-pomodoro":entry.selectedClass)} 
            onClick={onClickEntry} 
            id={entry.id}>
            <h3>
                 
                {text}
        
            </h3>
            {true &&
                <p>true</p>
            }
        </div>
    )
}
