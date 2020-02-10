import React from 'react'
import Button from './Button'
import RatingField from './RatingField'
import NotesField from './NotesField'
import TitleField from './TitleField'
import PomodoroField from './PomodoroField'
import '../assets/scss/EntryDialog.css'
import { StatusEnum } from './GlobalFunctions';

export default function EntryDialog({cancelPomodoro,setPomodoro}) {
    return (
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
                    <Button text="Cancel" onClickHandler={cancelPomodoro} />
                </div>
            </div>
        )
    
}