import React from 'react'
import {useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import {getStoredEntries, loadDataFromFile} from '../../Utility'

export default function Calendar(props) {
  let ev = []
  for(const prop in props.storedEntries) {
    ev.push( { 
      title: props.storedEntries[prop].length,
      date: prop
    })
  }
  
  const [currentDate, setCurrentDate] = useState(null)
  function handleDateClick(arg) { // bind with an arrow function
    let l = localStorage.getItem("wdlt_dates")
    l = JSON.parse(l)
    if(l.find( e => e === arg.dateStr) !== undefined) {
    
      props.setDiaryEntries(props.storedEntries[arg.dateStr])
      //props.setDiaryDay(props.setDiaryDay[arg.dateStr])
      setDiaryDay(arg.dateStr)
      setCurrentDate(arg.dateStr)
    }
    else {
      console.log("here")
      setCurrentDate(arg.dateStr)
      let newDiaryDay = props.diaryDay
      let key
      for(key in props.storedEntries) {
        if(key !== props.diaryDay) {
          newDiaryDay = key
      }
    }
      setDiaryDay(newDiaryDay)
      props.setDiaryEntries(props.storedEntries[newDiaryDay])
    }
  }

  /*
  props.handleLoad = function() {
    loadDataFromFile()
    let newDiaryDay = props.diaryDay
    let key
    for(key in props.storedEntries) {
      if(key !== props.diaryDay) {
        newDiaryDay = key
      }
    }
    props.setDiaryEntries(props.storedEntries[key])
    props.setDiaryDay(newDiaryDay)
  }
  */
  const [refresh,setRefresh] = useState({})
  const [diaryDay, setDiaryDay] = useState("")
  function r() {
    let d = new Date().toString()
    // re-renders the component
    setRefresh({d})
  };
  
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        events = {ev}
      />
    )
  
  
/*
  constructor(props) {
    super()
    this.ev = []
    let storedentries = getStoredEntries()
    for(const prop in storedentries) {
      this.ev.push( { 
        title: storedentries[prop].length,
        date: prop
      })
    }
  }
*/
}
/*
export default function xo(setCurrentDay) {

  let storedentries = getStoredEntries()
  let ev = []
  for(const prop in storedentries) {
    ev.push( { 
      title: storedentries[prop].length,
      date: prop
    })
  }
    return (
      <div>Calendar</div>
      
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={ev}
        />
      )
}*/