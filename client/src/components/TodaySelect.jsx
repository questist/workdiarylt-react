import React from 'react'
import DiaryEntries from './components/DiaryEntries'
import Timer from './components/Timer'
import EntryDialog from './components/EntryDialog'
import './assets/scss/app.css'

export default function TodaySelect() {
    //fill the todays values into a array to pass to the EntryListing Component

    let endString = "TBD"
    /*
    //test variables for today
    const values = ["Code","Break","Code","Lunch","Break"];
    let today = values.map((val,index) => {
    return {
        index: index,
        title: val,
        id:index + "_" + val,
        start:(startTime+= 1) + ":00PM",
        end:(endTime+= 1) + ":00PM",
    }
    })

    today[today.length-1].selected = true;
    */

    let fetchToday = [{
    index: 0,
    title: "Welcome ",
    id: "0_welcome",
    start: new Date(),
    end: endString,
    }]
    const [today, setToday] = useState(fetchToday)

    //set currently selected entry
    const [selectedEntry,setSelectedEntry] = useState(today[today.length-1]);

    //handle the onClickHander of the NEXT ENTRY BUTTON by adding the next entry after it
    function onNewEntry(e) {
        let l = today.length
        if(today[0].end === endString) {
            today[0].end = new Date()
        }
        else {
            console.log("Warning: The last Entry in Todays Entries end time was already set, while creating a new entry")
        }
        today.unshift({
            index: l,
            title: selectedEntry.title + l + " ",
            id: l + "_" + selectedEntry.title,
            start: new Date(),
            end: endString
        })
        setSelectedEntry(today[0])
    }

    //change currently selected entry when clicked
    function onClickEntry(e) {
        let entry = null;
        //could use filter here
        //need to extract the entry with the matching id passed from the today array of entry objects
        try {
            today.forEach((val,index) => {
            if(e.target.getAttribute('data-id') === val.id) { 
                entry = val
                throw "id found"
            }
            })
        }
        catch(e) {
            //throw error
            if(e === "id found") setSelectedEntry(entry)
            else throw Error("No matching entry selected: onClickEntry() Handler")
        }
        
        console.log("here");
    }
    return (
        <div className="today-select">
            <EntryDialog entry={selectedEntry} onNewEntry={onNewEntry}/>
            <DiaryEntries today={today} onClickEntry={onClickEntry} />
        </div>
    )
}