import React,{useState} from 'react'
import '../assets/scss/NotesField.css'


export default function TitleField({entry,onTitleChange}) {
    const [note,setNote] = useState(entry.title)
    function localOnTitleChange(e) {
        entry.title = e.target.value 
        setNote(entry.title)
        
        onTitleChange()

    }
    function selectInputText(e) {
        e.target.select()
    }
    
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