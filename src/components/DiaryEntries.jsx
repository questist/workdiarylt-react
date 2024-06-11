import React, {useState} from 'react'
import EntryListing from './EntryListing'
import '../assets/scss/DiaryEntries.css'
import { saveDataToFile } from '../Utility'

export default function DiaryEntries({entries}) {
    const initialOptions = {
        openId: null,
        open: true,
        clicked: function() {
            this.open = !this.open   
        },
        isOpen: function(id) {
            if(id === this.openId) {
                return this.open;
            }
            else {
                return false
            }
        }
    }
    const [dialogOptions,setDialog] = useState( initialOptions )
    
    /*onClickSave Handler 
    When the save button in the dialog is clicked close which automatically rerenders the list
    and updates it title
    */
    function onClickSave(e) {
        dialogOptions.clicked()
        setDialog({...dialogOptions})
       //TODO: saveDataToFile() and save and load file across the app
    }
    /*
    function onClickEntry(event,clickedEntry) 
        onClick Handler for when a listing entry is clicked on to toggle the EntryDialog
        also closes any open dialogs elsewhere in the list
    */
    function onClickEntry(e) {
        let el = e.target
        if(el.tagName === "H3") {
        el = el.parentNode
        }
        let id = null;
        //could use filter here
        //need to extract the entry with the matching id passed from the today array of entry objects
        try {
        entries.forEach((val,index) => {
            if(el.getAttribute('id') === val.id) { 
            id = val.id
            throw new Error("id found")
            }
        })
        }
        catch(e) {
        //throw error
        if(e.message !== "id found") throw new Error("No matching entry selected: onClickEntry() Handler")
        }
        //if the dialog is different from the currently open dialog, also used when list is initialized
        //then open the dialog by setting the dialog STATE from the initial value which is open
        if(id !== dialogOptions.openId) {
            let newOption = Object.assign({},initialOptions,{openId:id})
            setDialog(newOption)
        }
        //otherwise the dialog is already open so set dialog STATE from the current dialog STATE
        //then clicking it to toggle it's viewing
        else {
            dialogOptions.clicked()
            setDialog({...dialogOptions})
        }
        //dialogOptions.clicked()
    }
    //onclick rerenders this component so we had to add a effect to the state of the EntryListing

    const entryList = entries.map((entry,index) => {
        
            let e = (<EntryListing 
                key={entry.id}
                onClickEntry={onClickEntry}
                isDialogOpen={dialogOptions.isOpen(entry.id)}
                entry={entry}
                onClickSave={onClickSave}
            />)
            
            return e
        })
    return (
        <div className="todays-entries">
            {entryList}
        </div>
    )
}