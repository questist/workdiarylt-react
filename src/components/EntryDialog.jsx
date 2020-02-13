import React,{useState} from 'react'
import Button from './Button'
import RatingField from './RatingField'
import NotesField from './NotesField'
import TitleField from './TitleField'
import PomodoroField from './PomodoroField'
import '../assets/scss/EntryDialog.css'
import { StatusEnum } from './GlobalFunctions';

export default function EntryDialog({
    dialogTitle,Title,Note,Rating
}) {
    let dialog = ""
    const [titleLine,setDialogTitle] = useState(dialogTitle)
    
    function onTitleChange(titleInputValue) {
        Title(titleInputValue)
        setDialogTitle(dialogTitle)
    }
    dialog = (
        <div className="entry-dialog">
            <div>
                <h3>{titleLine}</h3>
                <div className="data-section">
                    <TitleField Title={Title} setTitle={onTitleChange}/>
                    <RatingField Rating={Rating} />
                    <NotesField Note={Note}/>
                </div>
                <div className="button-row">
                    <Button text="Save"/>
                </div>
            </div>
        </div>
    )
    
    return dialog
}