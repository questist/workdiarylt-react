import React, { useState,useContext,createContext} from 'react';
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

  const DataCache = {
    cache:{
      data: "Some Data"
    }
  }
  
  const Context = createContext(DataCache.cache)

  /* initialEntry for the data cache for the context */
  var initialEntry = {
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
    /* getters and setters needed throughout app*/
    get Id() {
      return this.id
    },
    get Title() {
      return this.title
    },
    set Title(t) {
      this.title = t
    },
    get Rating() {
      return this.rating
    },
    set Rating(r) {
      this.rating = r
    },
    get Note() {
      return this.note
    },
    set Note(n) {
      this.note = n
    },
    get Duration() {
      return this.duration
    },
    set Duration(d) {
      this.duration = d
    },
    /* automagical getter with no corresponding property - computed getters */
    get className() {
      if(this.isPomodoro && this.status === StatusEnum.NOTSTARTED) {
          return "entry-pomodoro"
      }
      else if(this.status === StatusEnum.RUNNING) {
          return "entry-selected"
      }
      else {
          return "entry-unselected"
      }
    },
    get listingTitle() {
      //status of a Pomodor is the only one that starts at NOTSTARTED
      //entry.start is the only text value for pomodoro not start.date() class like when once it is started
      if(this.status === StatusEnum.NOTSTARTED) {
          return this.start
      }
      //status once the entrylisting has been started once
      else if(this.status === StatusEnum.RUNNING 
              || this.status === StatusEnum.COMPLETED
              || this.status === StatusEnum.PAUSED) {
          return this.start.toLocaleTimeString() + " : " + this.title
      }
      //initial status for the app once it is opened, only one entry that hasn't been started
      else if(this.status === StatusEnum.APPSTARTED) {
          //let title = (entry.title === "Logging my activities")?"Welcome, Start your Work Diary Today":entry.title;
          return this.start.toLocaleTimeString() + " : " + "Welcome, Start your Work Diary Today"
      }
      else {
          throw new Error("EntryListing.setTitleText: Status should not found")
      }
    },
    get dialogTitle() {
      let titleLine = ""
      if(!this.isPomodoro || this.status === StatusEnum.COMPLETED) {
              let forString = (this.status === StatusEnum.COMPLETED)?(" for " + this.duration + " minutes"):""
              titleLine = "I felt like " + this.Title + 
                      " entries at " + this.start.toLocaleTimeString() + forString
      }
      else {
          titleLine = "I will be " + this.Title + " for " + this.duration + " minutes"
      }
      return titleLine
    },
  }

  
  //states
  const [entries, setEntries] = useState([initialEntry])
  const [isStarted,setStart] = useState(false)
  const [runningEntry,setRunningEntry] = useState(entries[0])
  const [startingPomodoro,setStartingPomodoro] = useState(null)
  const [editPomodoro,setEditPomodoro] = useState(false)
 

  const addEntry = (entry) => {
    
    const cloneInitial = Object.create(
      Object.getPrototypeOf(initialEntry),
      Object.getOwnPropertyDescriptors(initialEntry)
    )
    const newobj = Object.assign({}, cloneInitial, entry);
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
       //entries = fetchToday
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
       entries = fetchToday
       setEntries(fetchToday)
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
    //set the start buttons state in controls
    setStart(false)
    //stop the current entrylisting from running if it is being timed
    //NOTE: see if you can merge the above state change into stopRunning
    stopRunning()
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
    //set the state that is used as an index for the currently running pomodoro
    setStartingPomodoro(entries.length - startingLength - 1)
    //close the pomodoro dialog
    setEditPomodoro(false)
    //just save the currently running pomodoro for easy access
    //NOTE: see if you can remove this since you have the index
    setRunningEntry(entries[startingPomodoro])
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
   
    let elapsedTime = new Date() - entries[startingPomodoro].start
    //TODO: Move this some of this into iteratePomodoro
    if(elapsedTime >= (4000) && startingPomodoro - 1 >= 0) {
      entries[startingPomodoro].end = new Date()
      entries[startingPomodoro].status = StatusEnum.COMPLETED
      iteratePomodoro(startingPomodoro - 1)

    }
    else if(startingPomodoro == 0) {
      entries[startingPomodoro].end = new Date()
      entries[startingPomodoro].status = StatusEnum.COMPLETED
      //Set states to stop the app from timing
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
      entries={entries.length}
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
      <Context.Provider value={DataCache.cache}>
        <DiaryEntries entries={entries} />
      </Context.Provider>
    </div>
  
    </div>
  );
}

export default App;
