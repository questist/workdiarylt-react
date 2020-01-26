import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function TitleField({entry,options}) {
    const [note,setNote] = useState(entry.title)
    function onTitleChange(e) {
        entry.title = e.target.value
        setNote(entry.title)
        
        entry.setTitleText()

    }
    function selectInputText(e) {
        e.target.select()
    }
    useEffect(() => {document.forms.title.elements.entrytitle.value = entry.title})
    return (
        <div className="title-field">
            <form name="title">
                <label>What are you doing? (Action Verb ie. running)
                    <input name="entrytitle" type="textarea" value={note} onFocus={selectInputText} onChange={onTitleChange}/></label>
            </form>
        </div>
    )
}