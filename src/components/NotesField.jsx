import React,{useState,useEffect} from 'react'
import '../assets/scss/NotesField.css'

export default function NotesField({entry}) {
    const [note,setNote] = useState(entry.notes)
    function onNotesChange(e) {
        entry.notes = e.target.value
        setNote(entry.notes)
    }
    useEffect(() => {document.forms.dialog.elements.note.value = entry.notes})
    return (
        <div className="notes-field">
            <form name="dialog">
                <label>Note<input name="note" type="textarea" value={note} onChange={onNotesChange}/></label>
            </form>
        </div>
    )
}