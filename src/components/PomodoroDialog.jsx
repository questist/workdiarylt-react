import React from 'react'
import Button from './Button'
import RatingField from './RatingField'
import NotesField from './NotesField'
import TitleField from './TitleField'
import PomodoroField from './PomodoroField'
import '../assets/scss/EntryDialog.css'
import { StatusEnum } from './GlobalFunctions';

export default function EntryDialog({entry,onNewEntry,isEditPomodoro,setPomodoro}) {
    function onDetailsHandler() {
        //TODO
        console.log("Details")
    }
    
    let dialog = null

    if(isEditPomodoro) {
        dialog = (
            <div className="entry-dialog">
                <div>
                    <label>What will you be doing? (Action Verb ie running) <input id="pomodoro-title"/></label>
                    <br/>
                    <PomodoroField 
                        text="Number of Pomodoros" 
                        id="pomodoro-number"
                        value={4}
                        min={2}
                        max={9}/>
                    <br/>
                    <PomodoroField 
                        text="Duration of Pomodoros" 
                        id="pomodoro-duration"
                        value={25}
                        min={10}
                        max={60}/>
                    
                    <br/>
                    <PomodoroField 
                        text="Short Break (min)"
                        id="pomodoro-short-break"
                        value="5"
                        min={5}
                        max={30}
                    />
                    <br/>
                    <PomodoroField
                        text="Long Break (min)"
                        id="pomodoro-long-break"
                        value="15"
                        min={10}
                        max={60}
                    />
                    <Button text="Add Pomodoros" onClickHandler={setPomodoro} />
                </div>
            </div>
        )
    }
    
    else {
        let titleLine = ""
        if(!entry.isPomodoro || entry.status === StatusEnum.COMPLETED) {
             let forString = (entry.status === StatusEnum.COMPLETED)?(" for " + entry.duration + " minutes"):""
             titleLine = "I felt like " + entry.title + " entries at " + entry.start.toLocaleTimeString() + forString
        }
        else {
            titleLine = "I will be " + entry.title + " for " + entry.duration + " minutes"
        }
        
        dialog = (
            <div className="entry-dialog">
                <div>
                    <h3>{titleLine}</h3>
                    <div className="data-section">
                        <TitleField entry={entry}/>
                        <RatingField entry={entry} />
                        <NotesField entry={entry}/>
                    </div>
                    <div className="button-row">
                        <Button text="Next Entry" onClickHandler={onNewEntry}/>
                        <Button text="Edit"/>
                        <Button text="Details" onDetailsHandler={onDetailsHandler}/>
                    </div>
                </div>
            </div>
        )
    }
    return dialog
}