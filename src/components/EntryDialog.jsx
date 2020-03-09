import React,{useState} from 'react'
import Button from './Button'
import RatingField from './RatingField'
import NotesField from './NotesField'
import TitleField from './TitleField'
import '../assets/scss/EntryDialog.css'

export default function EntryDialog({
    entry,onClickSave
}) {
    let dialog = ""
    const [titleLine,setDialogTitle] = useState(entry.dialogTitle())
    
    function onTitleChange() {

        setDialogTitle(entry.dialogTitle())
    }

    dialog = (
        <div className="entry-dialog">
            <div>
                <h3>{titleLine}</h3>
                <div className="data-section">
                    <TitleField entry={entry} onTitleChange={onTitleChange}/>
                    <RatingField entry={entry} />
                    <NotesField entry={entry}/>
                </div>
                <div className="button-row">
                    <Button text="Save" onClickHandler={onClickSave}/>
                </div>
            </div>
        </div>
    )
    
    return dialog
}