import React from 'react'
import EntryListing from './EntryListing'
import '../assets/scss/DiaryEntries.css'

export default function DiaryEntries({today,onClickEntry}) {
    
    //onclick rerenders this component so we had to add a effect to the state of the EntryListing
    
    //console.log(today[0].title)
    const entries = today.map((entry,index) => {
            return <EntryListing 
                key={entry.id}
                entry={entry}
                onClickEntry={onClickEntry}
            />
        })
    return (
        <div className="todays-entries">
            {entries}
        </div>
    )
}