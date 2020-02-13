import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function NotesField({Note}) {
    const [note,setNote] = useState(Note())
    function onNotesChange(e) {
        Note(e.target.value)
        setNote(Note())
    }
    useEffect(() => {document.getElementById("note").value = Note()})
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