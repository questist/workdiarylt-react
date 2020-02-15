import React,{useState, useEffect, useRef, useCallback} from 'react'
import '../assets/scss/EntryListing.css'
import '../assets/scss/EntryDialog.css'
import EntryDialog from '../components/EntryDialog'
import {StatusEnum} from '../components/GlobalFunctions'

export default function EntryListing({
    onClickEntry,isDialogOpen,entry
}) {
    
    return (
        <React.Fragment>
            <div 
                className={"entry-listing " + entry.className} 
                onClick={onClickEntry} 
                id={entry.Id}
                style={isDialogOpen?{borderBottom: "0"}:{}}>
                
                <h3>{entry.listingTitle}</h3>
            </div>

            {isDialogOpen && <EntryDialog entry={entry} />}
        </React.Fragment>
    )
}
