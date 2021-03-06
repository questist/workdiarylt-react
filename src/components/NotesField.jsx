import React,{useState} from 'react'
import '../assets/scss/NotesField.css'


export default function NotesField({entry}) {
    const [note,setNote] = useState(entry.note)
    function onNotesChange(e) {
        entry.note = e.target.value
        setNote(entry.note)
    }
    
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