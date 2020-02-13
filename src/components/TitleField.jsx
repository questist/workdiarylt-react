import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function TitleField({Title,setTitleText}) {
    const [note,setNote] = useState(Title())
    function onTitleChange(e) {
        Title( e.target.value )
        setNote(Title)
        
        setTitleText()

    }
    function selectInputText(e) {
        e.target.select()
    }
    useEffect(() => {document.getElementById("entrytitle").value = Title()},[Title])
    return (
        <div className="title-field">
            
                <label>What are you doing? (Action Verb ie. running)
                    <input
                        name="entrytitle"
                        id="entrytitle"
                        type="textarea"
                        value={note}
                        onFocus={selectInputText}
                        onChange={onTitleChange}/></label>
        
        </div>
    )
}