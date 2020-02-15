import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function TitleField({entry,onTitleChange}) {
    const [note,setNote] = useState(entry.Title)
    function localOnTitleChange(e) {
        entry.Title = e.target.value 
        setNote(entry.Title)
        
        onTitleChange()

    }
    function selectInputText(e) {
        e.target.select()
    }
    //useEffect(() => {document.getElementById("entrytitle").value = Title()},[Title])
    return (
        <div className="title-field">
            
                <label>What are you doing? (Action Verb ie. running)
                    <input
                        name="entrytitle"
                        id="entrytitle"
                        type="textarea"
                        value={note}
                        onFocus={selectInputText}
                        onChange={localOnTitleChange}/></label>
        
        </div>
    )
}