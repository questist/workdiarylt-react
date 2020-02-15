import React,{useState, useEffect, useContext, useCallback} from 'react'
import '../assets/scss/EntryListing.css'
import '../assets/scss/EntryDialog.css'
import EntryDialog from '../components/EntryDialog'
import {StatusEnum,Context} from '../components/GlobalFunctions'

export default function EntryListing({
    onClickEntry,isDialogOpen,entry
}) {
    const theme = useContext(Context)
    console.log(theme.data)
    return (
        <React.Fragment>
            <div 
                className={"entry-listing " + entry.className()} 
                onClick={onClickEntry} 
                id={entry.id}
                style={isDialogOpen?{borderBottom: "0"}:{}}>
                
                <h3>{entry.listingTitle()}</h3>
            </div>

            {isDialogOpen && <EntryDialog entry={entry} />}
        </React.Fragment>
    )
}
