import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function TitleField({entry}) {
    const [note,setNote] = useState(entry.title)
    function onTitleChange(e) {
        entry.title = e.target.value
        setNote(entry.title)
        
        entry.setTitleText()

    }
    function selectInputText(e) {
        e.target.select()
    }
    useEffect(() => {document.getElementById("entrytitle").value = entry.title},[entry])
    return (
        <div className="title-field">
            
                <label>What are you doing? (Action Verb ie. running)
                    <input name="entrytitle" id="entrytitle" type="textarea" value={note} onFocus={selectInputText} onChange={onTitleChange}/></label>
        
        </div>
    )
}