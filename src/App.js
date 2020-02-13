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
    notes: "",
    rating: 0,
    isPomodoro: false,
    status: StatusEnum.APPSTARTED,
    duration: 0,
  }

 
  
  //states
  const [entries, setEntries] = useState([initialEntry])
  const [isStarted,setStart] = useState(false)
  const [runningEntry,setRunningEntry] = useState(entries[0])
  const [startingPomodoro,setStartingPomodoro] = useState(null)
  const [editPomodoro,setEditPomodoro] = useState(false)
 

  const addEntry = (entry) => {
    const newobj = Object.assign({}, initialEntry, entry);
    entries.unshift(newobj)
    console.log("length: " + entries.length)
    setEntries(entries)
  };
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
    if(entries[0].isPomodoro) {
       setStartingPomodoro(null)
       let fetchToday = entries.filter(function(val,index) {
         return !(val.isPomodoro && val.status !== StatusEnum.COMPLETED)
       })
      setEntries(fetchToday)
    }

    const extra = {
      index: entries.length,
      id: entries.length + runningEntry.title.slice(0,5),
      title: (runningEntry.isPomodoro === false)?runningEntry.title:"Logging my Activities",
      status: StatusEnum.RUNNING,
      start: new Date()
    }

    

    addEntry(extra)
    setRunningEntry(entries[0])
    
    // cssSetRatings(fetchToday[0])
    // setSelectedEntry(fetchToday[0])
    if(isStarted == false) {
      setStart(true)
    }
  }
/*
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
*/

  function onClickPomodoro(e) {
    //if runningEntry is still pomodoro the button is set to cancel so delete unfinished pomodoros
    if(runningEntry.isPomodoro) {
      setStartingPomodoro(null)
       let fetchToday = entries.filter(function(val,index) {
         if(val.isPomodoro && val.status !== StatusEnum.PAUSED) {
          val.end = new Date()
          let milliseconds = new Date(val.end - val.start)
          let minutes = Math.ceil(milliseconds / 1000 / 60)
          val.duration  = minutes
          val.status = StatusEnum.COMPLETED
          return true
         }
         return !(val.isPomodoro && val.status !== StatusEnum.COMPLETED)
       })
      setEntries(fetchToday)
    }
    setEditPomodoro(true)
  }
  
  function cancelPomodoro(e) {
    setEditPomodoro(false)
  }
  function setPomodoro() {
    setStart(false)
    stopRunning()
    let title = document.getElementById("pomodoro-title").value
    let duration = document.getElementById("pomodoro-duration").value
    let shortBreak = document.getElementById("pomodoro-short-break").value
    let longBreak = document.getElementById("pomodoro-long-break").value
    let number = document.getElementById("pomodoro-number").value 
    console.log("here" )
    let shortBreakCount = 0
    let longBreakCount = 0
    let startingLength = entries.length
    let tmpEntry = null
    for(let i=0,n=0,s=0; i < number;) {
      if(n < 4) {
        n++
        i++
        
        tmpEntry = {
          index: entries.length,
          title: (title == "")?"Pomodoro " + i:title,
          id: entries.length + "_" + title.slice(0,5),
          start: "Pomodoro " + i,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: duration,
        }
        addEntry(tmpEntry)
      }
      if(s < 3 && i != number) {
        s++
        shortBreakCount++
        tmpEntry = {
          index: entries.length,
          title: "Taking a Break",
          id: entries.length + "_sb",
          start: "Short Break " + shortBreakCount,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: shortBreak,
        }
        addEntry(tmpEntry)
      }
      else if(i != number) {
        n = 0
        s = 0
        longBreakCount++
        tmpEntry = {
          index: entries.length,
          title: "Taking a Break",
          id: entries.length + "_lb",
          start: "Long Break " + longBreakCount,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: longBreak,
        }
        addEntry(tmpEntry)
      }
    }
    setStartingPomodoro(entries.length - startingLength - 1)
    setEditPomodoro(false)
    setRunningEntry(entries[startingPomodoro])
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
      if(entries[0].isPomodoro === true && entries[0].status !== StatusEnum.COMPLETED) {
        let starting = entries[startingPomodoro]
        if(starting.status == StatusEnum.PAUSED) starting.status = StatusEnum.RUNNING
        else iteratePomodoro(startingPomodoro)
      }
      //otherwise if the app just started start timing the first item
      else if(entries[0].status === StatusEnum.APPSTARTED) {
        entries[0].status = StatusEnum.RUNNING
        entries[0].start = new Date()
      }
      //otherwise add a new entry because the app was paused
      else {
        console.log("here 2")
        onNewEntry()
      }
    }
  }

  
  function iteratePomodoro(index) {
    let start = entries[index]
    start.start = new Date()
    start.status = StatusEnum.RUNNING
    //start.setTitleText()
    //cssUnselectEntry(runningEntry)
    //cssSelectEntry(start)
    //cssMoveEntryDialog(start)
    
    setRunningEntry(start)
    setStartingPomodoro(index)
    
    //start.setTitleText()
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
      selectedEntry={runningEntry}
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
      <DiaryEntries entries={entries} />
    </div>
  
    </div>
  );
}

export default App;
