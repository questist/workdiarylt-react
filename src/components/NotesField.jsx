import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function NotesField({entry}) {
    const [note,setNote] = useState(entry.Note)
    function onNotesChange(e) {
        entry.Note = e.target.value
        setNote(entry.Note)
    }
    //useEffect(() => {document.getElementById("note").value = Note()})
    return (
        <div className="notes-field">
            
                <label>Note<input 
                    name="note"
                    id="note"
                    type="textarea"
                    value={note}
                    onChange={onNotesChange}/>
                </label>
            
        </div>
    )
}