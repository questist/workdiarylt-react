import React,{useState, useEffect} from 'react'
import '../assets/scss/EntryListing.css'
import '../assets/scss/EntryDialog.css'
import Button from './Button'
import RatingField from './RatingField'
import NotesField from './NotesField'
import TitleField from './TitleField'
import {StatusEnum} from '../components/GlobalFunctions'

export default function EntryListing({entry,onClickEntry,options}) {
    let startTime = ""
    const [dialog,setDialog] = useState("")
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
    function onClickCloseDialog(e) {
        setDialog("")
    }
    function entryOnClickEntry(e) {
        let titleLine = ""
        if(!entry.isPomodoro || entry.status == StatusEnum.COMPLETED) {
             let forString = (entry.status == StatusEnum.COMPLETED)?(" for " + entry.duration + " minutes"):""
             titleLine = "I felt like " + entry.title + " today at " + entry.start.toLocaleTimeString() + forString
        }
        else {
            titleLine = "I will be " + entry.title + " for " + entry.duration + " minutes"
        }
        
        setDialog( (
            <div className="entry-dialog" onClick={onClickCloseDialog}>
                <div>
                    <h3>{titleLine}</h3>
                    <div className="data-section">
                        <TitleField entry={entry}/>
                        <RatingField entry={entry} />
                        <NotesField entry={entry}/>
                    </div>
                    <div className="button-row">
                        <Button text="Edit"/>
                        <Button text="Details"/>
                    </div>
                </div>
            </div>
        ))
    }
    useEffect(() => {
        entry.setTitleText()
    },[entry])

    return (
        <React.Fragment>
            <div 
                className={"entry-listing " + 
                    ((entry.isPomodoro && entry.status === StatusEnum.NOTSTARTED && entry.selectedClass !== "entry-selected")?"entry-pomodoro":entry.selectedClass)} 
                onClick={entryOnClickEntry} 
                id={entry.id}>
                <h3>
                    
                    {text}
            
                </h3>
                
            </div>
            {dialog}
        </React.Fragment>
    )
}
