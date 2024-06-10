import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import QuickSelect from './components/QuickSelect'
import DiaryEntries from './components/DiaryEntries'
import PomodoroDialog from './components/PomodoroDialog'
import './assets/scss/app.css'
import ltlogo from './assets/images/logo.png'
import workimgselected from './assets/images/menu-work-selected.png'
import diaryimgunselected from './assets/images/menu-diary-unselected.png'
import alarm from './assets/audio/alarm.mp3'
import {StatusEnum, initialDiaryEntry} from './components/GlobalFunctions'
import Controls from './components/Controls'
import Calendar from './components/diary-screen/Calendar'
import Diary from './components/diary-screen/Diary'
import { getDate, loadDataFromFile,saveDataToFile, storedEntries, getTodaysSavedEntries } from './Utility';
import DiaryControls from './components/diary-screen/DiaryControls'
import { getDateMeta } from '@fullcalendar/react';
import { initialEntry } from './components/GlobalFunctions';

function App() {

  
  //states
  const [entries, setEntries] = useState(getTodaysSavedEntries())
  const [isStarted,setStart] = useState(false)
  const [runningEntry,setRunningEntry] = useState(entries[0])
  const [startingPomodoro,setStartingPomodoro] = useState(null)
  const [editPomodoro,setEditPomodoro] = useState(false)
 

  
  const addEntry = (entry) => {
    const newobj = Object.assign({}, initialEntry, entry);
    entries.unshift(newobj)

    setEntries(entries)
  };
  
  function startQuickEntry(value) {
    if(isStarted) {
      stopRunning()
    }
    if(entries[0].isPomodoro) {
      onClickPomodoro()
    }
    const extra = {
      index: entries.length,
      id: entries.length + value.slice(0,5),
      title: value,
      status: StatusEnum.RUNNING,
      start: new Date()
    }
    

    addEntry(extra)
    setRunningEntry(entries[0])
    
    
    setStart(true)
  }
  //handle the onClickHander of the NEXT ENTRY BUTTON by adding the next entry after it
  function onNewEntry() {

    const extra = {
      index: entries.length,
      id: entries.length + runningEntry.title.slice(0,5),
      title: (runningEntry.isPomodoro === false)?runningEntry.title:"Logging my Activities",
      status: StatusEnum.RUNNING,
      start: new Date()
    }
    

    addEntry(extra)
    setRunningEntry(entries[0])
    
    if(isStarted === false) {
      setStart(true)
    }
  }

  /* Saved this snippet for if I need to find the id from an entry listing event object 
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
    */

  /*
    onClickHandler for the Pomodoro button in Controls
    it has two states
    CANCEL - to stop all existing Pomodoros that haven't been started yet
    POMODORO - to open the pomodoro dialog box
  */
  function onClickPomodoro(e) {
    //if runningEntry is still pomodoro the button is set to cancel so delete unfinished pomodoros
    //CANCEL POMODOROS
    if(runningEntry.isPomodoro && runningEntry.status !== StatusEnum.COMPLETED) {
      setStartingPomodoro(null)
       for(let i = entries.length - 1;i >= 0;i--) {
         //if a pomodoro is paused complete it now
         if(entries[i].isPomodoro && (entries[i].status === StatusEnum.PAUSED || entries[i].status === StatusEnum.RUNNING)) {
          //the end date was set when it was paused but not when it was running
          if(entries[i].status === StatusEnum.RUNNING) {
            entries[i].end = new Date()
          }
          
          let milliseconds = new Date(entries[i].end - entries[i].start)
          entries[i].duration  = milliseconds.getTime()
          entries[i].status = StatusEnum.COMPLETED
          continue
         }
         if(entries[i].isPomodoro && entries[i].status !== StatusEnum.COMPLETED) {
          entries.shift()
         }
       }
       //and add a appstarted pomodoro again if it hasn't run any yet
       if(entries.length === 0) {
         addEntry({})
       }
       setStartingPomodoro(null)
       setRunningEntry(entries[0])
       setStart(false)
    }
    //otherwise open the pomodoro dialog/modal
    else {
      setEditPomodoro(true)
    }
  }
  /*
    onClickHandler in the PomodoroDialog for canceling the Pomodoro set up process
    just closes the dialog/modal
  */
  function cancelPomodoro(e) {
    setEditPomodoro(false)
  }

  /*
    onClickHandler for ADD POMODORO button in Pomodoro dialog
    that does the Pomodoro Set Up Process 
  */
  function setPomodoro() {
    //if the app hasn't run a pomodoro yet then remove the first entry and only entry
    //currently this is the only place where this behaviour occurs so the code is here
    //instead of stopRunning
    if(entries[0].status === StatusEnum.APPSTARTED) {
      entries.pop()
    }
    else {
      //set the start buttons state in controls
      setStart(false)
      //stop the current entrylisting from running if it is being timed
      //NOTE: see if you can merge the above state change into stopRunning
      stopRunning()
    }
    //get values from the PomodoroDialog Component
    let title = document.getElementById("pomodoro-title").value
    let duration = document.getElementById("pomodoro-duration").value
    let shortBreak = document.getElementById("pomodoro-short-break").value
    let longBreak = document.getElementById("pomodoro-long-break").value
    let number = document.getElementById("pomodoro-number").value 
    
    //variable for titles of the Pomodoro breaks because they don't repeat within loop
    let shortBreakCount = 0
    let longBreakCount = 0

    //save the length for later use in calculating startingPomodoro State
    let startingLength = entries.length
    let tmpEntry = null
    for(let i=0,n=0,s=0; i < number;) {
      if(n < 4) {
        n++
        i++
        
        tmpEntry = {
          index: entries.length,
          title: (title === "")?"Pomodoro " + i:title,
          id: entries.length + "_" + title.slice(0,5),
          start: "Pomodoro " + i,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: duration * 60 * 1000,
        }
        addEntry(tmpEntry)
      }
      if(s < 3 && i !== number) {
        s++
        shortBreakCount++
        tmpEntry = {
          index: entries.length,
          title: "Taking a Break",
          id: entries.length + "_sb",
          start: "Short Break " + shortBreakCount,
          isPomodoro: true,
          status: StatusEnum.NOTSTARTED,
          duration: shortBreak * 60 * 1000,
        }
        addEntry(tmpEntry)
      }
      else if(i !== number) {
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
          duration: longBreak * 60 * 1000,
        }
        addEntry(tmpEntry)
      }
    }
    //just save the currently running pomodoro for easy access
    //NOTE: see if you can remove this since you have the index
    setRunningEntry(entries[entries.length - startingLength - 1])
    //set the state that is used as an index for the currently running pomodoro
    setStartingPomodoro(entries.length - startingLength - 1)
     
    //close the pomodoro dialog
    setEditPomodoro(false)
    
   
  }

  /*
    stops the app EntryListing that is currently being timed
  */
  function stopRunning() {
    //when startingPomodoro is not null there are pomodoros currently running
    //so pause them
    if(startingPomodoro !== null) {
      let start = entries[startingPomodoro]
      start.status = StatusEnum.PAUSED
      //set end time just in case the pomodoros are canceled
      start.end = new Date()
    }
    //otherwise this is definitly a regular entry and can be COMPLETED
    //NOTE: the timer automatically stops timing currently if isStart is set
    //      so maybe move that logic into stop running - check places where setStart is set
    else {
      let start = entries[0]
      start.status = StatusEnum.COMPLETED
      start.end = new Date()
      let milliseconds = new Date(start.end - start.start)
      start.duration  = milliseconds.getTime()
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
        //unpause a pomodoro by resetting it's duration to include the time passed during pause
        if(starting.status === StatusEnum.PAUSED) {
          starting.status = StatusEnum.RUNNING
          let now = new Date()
          
          starting.duration = now.getTime() - starting.end.getTime() + starting.duration
        }
        else iteratePomodoro(startingPomodoro)
      }
      //otherwise if the app just started start timing the first item
      else if(entries[0].status === StatusEnum.APPSTARTED) {
        entries[0].status = StatusEnum.RUNNING
        entries[0].start = new Date()
      }
      //otherwise add a new entry because the last entry was completed
      //and there are not still pomodoros to be run
      else {
        onNewEntry()
      }
    }
  }

  /*
    sets up the next pomodoro and starts it running
  */
  function iteratePomodoro(index) {
    let start = entries[index]
    start.start = new Date()
    start.status = StatusEnum.RUNNING
    setRunningEntry(start)
    setStartingPomodoro(index)
    
    //start.setTitleText()
  }

  /*
    Used by the timer to move from Pomodoro to the next Pomodoro
    Not used in entries that are not pomodoros
  */
  function checkEntry() {
    if(isStarted === false || startingPomodoro === null) return
   
    let elapsedTime = new Date().getTime() - entries[startingPomodoro].start.getTime()
    //let elapsedTime = new Date() - entries[startingPomodoro].start
    //TODO: Move this some of this into iteratePomodoro
    let running = entries[startingPomodoro]
    if(elapsedTime >= running.duration && startingPomodoro - 1 >= 0) {
      running.end = new Date()
      
      let sound = new Audio(alarm)
      sound.play()

      running.status = StatusEnum.COMPLETED
      iteratePomodoro(startingPomodoro - 1)

    }
    else if(startingPomodoro === 0) {
      running.end = new Date()
      running.status = StatusEnum.COMPLETED
      //Set states to stop the app from timing
      setStartingPomodoro(null)
      setStart(false)
    }
   
  }

  //load the quick selects
  let quickselects = null
  if(!editPomodoro) {
    let added = []
    quickselects = entries.map((entry) => {
      
      //if it's the default entry in the app
      if(entry.title === "Logging my activities" || entry.title.indexOf("Pomodoro") !== -1) {
        return undefined
      }
      //check that it's the same title as another in the app and if it hasn't been added yet
      let found = added.findIndex( (value) => value === entry.title )
    
      if(found === -1) {
        added.push(entry.title)
      }
      else {
        return undefined
      }
      return <QuickSelect key={entry.id} value={entry.title} startQuickEntry={startQuickEntry} />
    })
    quickselects = quickselects.filter((value) => value !== undefined)
  }

  //Save the current entries
  function onClickSave() {
    if(runningEntry.isPomodoro) {
      onClickPomodoro(null)
    } else {
      if(isStarted) {
        setStart(false)
        stopRunning()
      }
    }
    storedEntries[getDate()] = entries
    saveDataToFile()
  }
  /****************** Diary Screen Function *******************/
  

  
  const [diaryEntries,setDiaryEntries] = useState([initialDiaryEntry])
  const [diaryDay,setDiaryDay] = useState("2022-10-03")
  
  function onClickToggle() {
    alert("Toggle clicked")
  }


  async function onClickLoad() {
    
    await loadDataFromFile()


    const keys = Object.keys(storedEntries)
    const day = keys[keys.length-1]
    setDiaryEntries(storedEntries[day])
    setDiaryDay(day)
  }

  return (
    <Router>
    <div className="App">
    
      <div className="header" style={{textAlign: 'initial'}}>
        <img src={ltlogo} />
        <div className="nav">
          <Link to="/"><img src={workimgselected} /></Link>
          <Link to="/diary"><img src={diaryimgunselected} /></Link>
        </div>
      </div>
    
    <Switch>
      <Route exact path="/">

        <Controls
          entriesLength={entries.length}
          selectedEntry={runningEntry}
          onClickPomodoro={onClickPomodoro}
          onClickStart={onClickStart}
          onClickSave={onClickSave}
          isStarted={isStarted}
          checkEntry={checkEntry}
        />
        <div className="today-select">
          {editPomodoro ?
          <PomodoroDialog 
            setPomodoro={setPomodoro}
            cancelPomodoro={cancelPomodoro}
          />:<div className="quick-selects-section">{(quickselects.length > 0)? "Quick Start an Entry...":""}<div>{quickselects}</div></div>}
          <DiaryEntries entries={entries} />
          
        </div>
        </Route>
        <Route path="/diary">
        <div>
          <DiaryControls 
            entriesLength={diaryEntries?.length}
            onClickToggle={onClickToggle}
            onClickLoad={onClickLoad}
          />
            <div className="today-select">
            <div className="quick-selects-section">
                <Calendar
                    handleLoad={onClickLoad} storedEntries = {storedEntries} setDiaryDay = {setDiaryDay} setDiaryEntries = {setDiaryEntries}
                />
            
            </div>
            <DiaryEntries entries={diaryEntries}/>
            </div>
        </div>
        </Route>
    </Switch>
  
    </div>
    </Router>
  );
}

export default App;
