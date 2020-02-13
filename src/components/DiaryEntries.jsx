import React, {useState} from 'react'
import EntryListing from './EntryListing'
import '../assets/scss/DiaryEntries.css'


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
    
    /*
    function onClickEntry(event,clickedEntry) 
        onClick Handler for when a listing entry is clicked on to toggle the EntryDialog
        also closes any open dialogs elsewhere in the list
    */
    function onClickEntry(e,entry) {
        //if the dialog is different from the currently open dialog, also used when list is initialized
        //then open the dialog by setting the dialog STATE from the initial value which is open
        if(entry.id !== dialogOptions.openId) {
            let newOption = Object.assign({},initialOptions,{openId:entry.id})
            setDialog(newOption)
        }
        //otherwise the dialog is already open so set dialog STATE from the current dialog STATE
        //then clicking it to toggle it's viewing
        else {
            let newOption = Object.assign({},dialogOptions,{openId:entry.id})
            newOption.clicked()
            setDialog(newOption)
        }
        //dialogOptions.clicked()
    }
    //onclick rerenders this component so we had to add a effect to the state of the EntryListing
    
    console.log(entries.length)

    const entryList = entries.map((entry,index) => {
        
            let e = (<EntryListing 
                key={entry.id}
                entry={entry}
                onClickEntry={onClickEntry}
                isDialogOpen={dialogOptions.isOpen(entry.id)}
            />)
            
            return e
        })
    return (
        <div className="todays-entries">
            {entryList}
        </div>
    )
}