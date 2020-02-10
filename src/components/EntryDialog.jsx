import React from 'react'
import Button from './Button'
import RatingField from './RatingField'
import NotesField from './NotesField'
import TitleField from './TitleField'
import PomodoroField from './PomodoroField'
import '../assets/scss/EntryDialog.css'
import { StatusEnum } from './GlobalFunctions';

export default function EntryDialog({entry}) {
    let dialog = ""
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
                    <Button text="Edit"/>
                </div>
            </div>
        </div>
    )
    
    return dialog
}