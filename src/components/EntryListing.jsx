import React,{useState, useEffect, useRef, useCallback} from 'react'
import '../assets/scss/EntryListing.css'
import '../assets/scss/EntryDialog.css'
import EntryDialog from '../components/EntryDialog'
import {StatusEnum} from '../components/GlobalFunctions'

export default function EntryListing({
    id,onClickEntry,isDialogOpen,dialogTitle,listingTitle,Title,Note,Rating,className
}) {
    
    return (
        <React.Fragment>
            <div 
                className={"entry-listing " + className} 
                onClick={onClickEntry} 
                id={id}
                style={isDialogOpen?{borderBottom: "0"}:{}}>
                
                <h3>{listingTitle}</h3>
            </div>

            {isDialogOpen && <EntryDialog
                dialogTitle={dialogTitle}
                Title={Title}
                Rating={Rating}
                Note={Note}
            />}
        </React.Fragment>
    )
}
