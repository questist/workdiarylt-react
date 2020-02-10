import React, { useState} from 'react';
import logo from './logo.svg';
import './App.css';
import DiaryEntries from './components/DiaryEntries'
import Timer from './components/Timer'
import EntryDialog from './components/EntryDialog'
import Button from './components/Button'
import PomodoroDialog from './components/PomodoroDialog'
import './assets/scss/app.css'
import ltlogo from './assets/images/logo.png'
import workimgselected from './assets/images/menu-work-selected.png'
import diaryimgunselected from './assets/images/menu-diary-unselected.png'
//import alarm from './assets/audio/alarm.mp3'
import {StatusEnum} from './components/GlobalFunctions'
import Controls from './components/Controls'

function App() {
  /*
  //test variables for today
  const values = ["Code","Break","Code","Lunch","Break"];
  let entries = values.map((val,index) => {
    return {
        index: index,
        title: val,
        id:index + "_" + val,
        start:(startTime+= 1) + ":00PM",
        end:(endTime+= 1) + ":00PM",
    }
  })

  entries[entries.length-1].selected = true;
  */

  let initialEntry = {
    index: 0,
    title: "Logging my activities",
    id: "0_welcome",
    start: new Date(),
    end: null,
    selectedClass: 'entry-selected',
    notes: "",
    rating: 0,
    isPomodoro: false,
    status: StatusEnum.APPSTARTED,
    duration: 0,
  }

  const [entries, setEntries] = useState([initialEntry])
  const [isStarted,setStart] = useState(false)

  const addEntry = (entry) => {
    entries.unshift(entry)
    console.log("length: " + entries.length)
    setEntries(entries)
  };
  
  //set currently selected entry
  const [selectedEntry,setSelectedEntry] = useState(entries[entries.length-1]);
  const [startingPomodoro,setStartingPomodoro] = useState(null)
  const [editPomodoro,setEditPomodoro] = useState(false)
  //this is defined here to unselect the background color of the EntryListing component, try to move it in later
  function cssUnselectEntry(oldSelectedEntry) {
    //deselect the selected item
    let tokens = document.getElementById(oldSelectedEntry.id).classList
    tokens.remove("entry-selected")
    tokens.add("entry-unselected")
    oldSelectedEntry.selectedClass = "entry-unselected"
  }

  //Moves the Entry Dialog
  //returns the position of the newly selected Entry
  function cssMoveEntryDialog(newlySelectedEntry) {
    let heightOfDialog = 250
    let heightOfEntry = 40

    //lets change entry dialogs position relative to the selected entry
    //now find it's position in the NodeList and calculate it's position on screen
    let nodes = document.getElementsByClassName("entry-listing")
    let i = 0
    Array.prototype.forEach.call(nodes,function(val,index) {
      if(val.getAttribute("id") === newlySelectedEntry.id) i = index
    })
      //for centering if((heightOfDialog/2) < (heightOfEntry * i)) {
      document.getElementsByClassName("entry-dialog")[0].style.top = (heightOfEntry * i) + "px"
    
    return i
  }

  function cssSelectEntry(newlySelectedEntry) {
    //this part is for when the item is click (ie onClickEntry) IF IT IS NOT A NEW ENTRY
    
    let el = document.getElementById(newlySelectedEntry.id)
    let tokens = el.classList
    tokens.remove("entry-unselected")
    tokens.add("entry-selected")
    newlySelectedEntry.selectedClass = "entry-selected"
    
  }
  
  //handle the onClickHander of the NEXT ENTRY BUTTON by adding the next entry after it
  function onNewEntry(e) {
    //delete pomodoros
    // if(today[0].isPomodoro) {
    //   setStartingPomodoro(null)
    //   fetchToday = today.filter(function(val,index) {
    //     return !(val.isPomodoro && val.status !== StatusEnum.COMPLETED)
    //   })
    //   setToday(fetchToday)
    // }
    // else {
    //   fetchToday = today
    // }

    // let l = fetchToday.length
    // let topEntry = fetchToday[0]
    // if(topEntry.status === StatusEnum.RUNNING) {
    //   topEntry.end = new Date()
    // }
    // else {
    //   console.log("Warning: The last Entry in Todays Entries end time was already set, while creating a new entry")
    // }
    // if(selectedEntry.isPomodoro === false) {
    //   selectedEntry.selectedClass = "entry-unselected"
    // }
    const extra = {
      id: entries.length + selectedEntry.title.slice(0,5),
      title: (selectedEntry.isPomodoro === false)?selectedEntry.title:"Logging my Activities",
      status: StatusEnum.RUNNING
    }

    const newobj = Object.assign({}, initialEntry, extra);

    addEntry(newobj)
    console.log("Here")
    
    // fetchToday.unshift({
    //   index: l,
    //   title: (selectedEntry.isPomodoro === false)?selectedEntry.title:"Logging my Activities",
    //   id: l + "_" + selectedEntry.title.slice(0,5),
    //   start: new Date(),
    //   end: null,
    //   selectedClass: "entry-selected",
    //   notes: "",
    //   rating: 0,
    //   isPomodoro: false,
    //   status: StatusEnum.RUNNING,
    //   duration: 0,
    // })
    
    if(selectedEntry.isPomodoro === false) {
      cssUnselectEntry(selectedEntry)
    }
    //cssSelectEntry(today[0])
    //might reset if the top one is a pomodoro but thats ok
    // if(fetchToday[1].status !== StatusEnum.APPSTARTED) {
    //   fetchToday[1].status = StatusEnum.COMPLETED
    // }
    
    // cssSetRatings(fetchToday[0])
    // setSelectedEntry(fetchToday[0])
    if(isStarted == false) {
      setStart(true)
    }
  }

  function cssSetRatings(entry) {
    let stars = document.getElementsByClassName("star")
    Array.prototype.forEach.call(stars, function(el,index) {
        let tokens = el.classList
        if(index < entry.rating) {
            tokens.remove("star-unselected")
            tokens.add("star-selected")
        }
        else {
            tokens.remove("star-selected")
            tokens.add("star-unselected")
        }
    })
  }

  //change currently selected entry when clicked
  function onClickEntry(e) {
    let el = e.target
    if(el.tagName === "H3") {
      el = el.parentNode
    }
    let entry = null;
    //could use filter here
    //need to extract the entry with the matching id passed from the today array of entry objects
    try {
      entries.forEach((val,index) => {
        if(el.getAttribute('id') === val.id) { 
          entry = val
          throw new Error("id found")
        }
      })
    }
    catch(e) {
      //throw error
      if(e.message !== "id found") throw new Error("No matching entry selected: onClickEntry() Handler")
    }
    
    if(entry.id !== selectedEntry.id) {
      cssUnselectEntry(selectedEntry)
      cssSelectEntry(entry)
      cssMoveEntryDialog(entry)
      cssSetRatings(entry)
    }
    setSelectedEntry(entry);
  }


  function onClickPomodoro(e) {
    setEditPomodoro(true)
  }
  
  function cancelPomodoro(e) {
    setEditPomodoro(false)
  }
  function setPomodoro() {
    let title = document.getElementById("pomodoro-title").value
    let duration = document.getElementById("pomodoro-duration").value
    let shortBreak = document.getElementById("pomodoro-short-break").value
    let longBreak = document.getElementById("pomodoro-long-break").value
    let number = document.getElementById("pomodoro-number").value 
    console.log("here" )
    let shortBreakCount = 0
    let longBreakCount = 0
    let entries = entries.length
    for(let i=0,n=0,s=0; i < number;) {
      console.log("i = " + i)
      if(n < 4) {
        n++
        i++
        
        entries.unshift({
          index: entries.length,
          title: (title == "")?"Pomodoro " + i:title,
          id: entries.length + "_" + title.slice(0,5),
          start: "Pomodoro " + i,
          end: 0,
          selectedClass: "entry-unselected",
          notes: "",
          rating: 0,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: duration,
        })
      }
      if(s < 3 && i != number) {
        s++
        shortBreakCount++
        entries.unshift({
          index: entries.length,
          title: "Taking a Break",
          id: entries.length + "_sb",
          start: "Short Break " + shortBreakCount,
          end: null,
          selectedClass: "entry-unselected",
          notes: "",
          rating: 0,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: shortBreak,
        })
      }
      else if(i != number) {
        n = 0
        s = 0
        console.log("i="+i + "/number="+number)
        longBreakCount++
        entries.unshift({
          index: entries.length,
          title: "Taking a Break",
          id: entries.length + "_lb",
          start: "Long Break " + longBreakCount,
          end: null,
          selectedClass: "entry-unselected",
          notes: "",
          rating: 0,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: longBreak,
        })
      }
    }
    setStartingPomodoro(entries.length - entries - 1)
    let lastPomodoro = entries[0]
    lastPomodoro.selectedClass = "entry-selected"
    
    document.getElementsByClassName("entry-dialog")[0].style.top = "0px"
    
    cssUnselectEntry(selectedEntry)
    setEditPomodoro(false)
    
    cssSetRatings(lastPomodoro)
   
    setSelectedEntry(lastPomodoro)

  }



  function stopRunning() {
    if(startingPomodoro !== null) {
      let start = entries[startingPomodoro]
      start.status = StatusEnum.PAUSED
      start.end = new Date()
    }
    else {
      let start = entries[0]
      start.status = StatusEnum.COMPLETED
      start.end = new Date()
      let milliseconds = new Date(start.end - start.start)
      let minutes = Math.ceil(milliseconds / 1000 / 60)
      start.duration  = minutes
    }
  }
  
  /*
  click handler Functionality for the START BUTTON
  Will Pause the app from running stoping the timer or
  start a Pomodoro set running otherwise
  if the first entry is the first entry of the day it will start timing that one
  or add a new one and start it timing
  */
  function onClickStart(e) {
    
    if(isStarted) {
      setStart(false)
      stopRunning()
      
    }
    else {
    
      setStart(true)
      //if the last entry is a pomodoro then start at the first pomodoro in the sequence
      //remember the pomodoros are deleted on day save and on regular new entries which is why this works
      if(entries[0].isPomodoro === true) {
        let starting = entries[startingPomodoro]
        if(starting.status == StatusEnum.PAUSED) starting.status = StatusEnum.RUNNING
        else iteratePomodoro(startingPomodoro)
      }
      //otherwise if the app just started start timing the first item
      else if(entries[0].status === StatusEnum.APPSTARTED) {
        entries[0].status = StatusEnum.RUNNING
      }
      //otherwise add a new entry because the app was paused
      else {
        console.log("here 2")
        onNewEntry(1)
      }
    }
  }

  
  function iteratePomodoro(index) {
    let start = entries[index]
    start.start = new Date()
    //start.setTitleText()
    cssUnselectEntry(selectedEntry)
    cssSelectEntry(start)
    cssMoveEntryDialog(start)
    cssSetRatings(start)
    setSelectedEntry(start)
    setStartingPomodoro(index)
    start.status = StatusEnum.RUNNING
    start.setTitleText()
  }

  function checkEntry() {
    if(isStarted === false || startingPomodoro === null) return
    console.log(entries[startingPomodoro].start)
   
    let elapsedTime = new Date() - entries[startingPomodoro].start
    console.log(elapsedTime)
    if(elapsedTime >= (4000) && startingPomodoro - 1 >= 0) {
      //today[startingPomodoro].end = new Date() TODO
      entries[startingPomodoro].end = new Date()
      entries[startingPomodoro].status = StatusEnum.COMPLETED
      iteratePomodoro(startingPomodoro - 1)

    }
    else if(startingPomodoro == 0) {
      entries[startingPomodoro].end = new Date()
      entries[startingPomodoro].status = StatusEnum.COMPLETED
      setStartingPomodoro(null)
      setStart(false)
    }
   
  }
  return (
    <div className="App">
    <div className="header" style={{textAlign: 'initial'}}>
      <img src={ltlogo} />
      <div className="nav">
        <img src={workimgselected} />
        <img src={diaryimgunselected} />
      </div>
    </div>
    <Controls
      entries={entries}
      selectedEntry={selectedEntry}
      onClickPomodoro={onClickPomodoro}
      onClickStart={onClickStart}
      isStarted={isStarted}
      checkEntry={checkEntry}
    />
    <div className="today-select">
      {editPomodoro ?
      <PomodoroDialog 
        setPomodoro={setPomodoro}
        cancelPomodoro={cancelPomodoro}
      />:<div></div>}
      <DiaryEntries entries={entries} onClickEntry={onClickEntry} />
    </div>
  
    </div>
  );
}

export default App;
