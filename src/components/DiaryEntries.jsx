import React, {useState} from 'react'
import EntryListing from './EntryListing'
import '../assets/scss/DiaryEntries.css'


export default function DiaryEntries({entries}) {
    const [selectedEntry,setSelectedEntry] = useState(entries[0])
    
    function onClickEntry(e,entry) {
        setSelectedEntry(entry)
    }
    //onclick rerenders this component so we had to add a effect to the state of the EntryListing
    
    console.log(entries.length)

    const entryList = entries.map((entry,index) => {
            let e = (<EntryListing 
                key={entry.id}
                entry={entry}
                onClickEntry={onClickEntry}
            />)
            
            return e
        })
    return (
        <div className="todays-entries">
            {entryList}
        </div>
    )
}