import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function NotesField({entry}) {
    const [note,setNote] = useState(entry.notes)
    function onNotesChange(e) {
        entry.notes = e.target.value
        setNote(entry.notes)
    }
    useEffect(() => {document.getElementById("note").value = entry.notes})
    return (
        <div className="notes-field">
            
                <label>Note<input name="note" id="note" type="textarea" value={note} onChange={onNotesChange}/></label>
            
        </div>
    )
}