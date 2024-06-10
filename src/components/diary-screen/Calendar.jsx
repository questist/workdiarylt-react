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
  
  //const [currentDate, setCurrentDate] = useState(null)
  function handleDateClick(arg) { // bind with an arrow function
    let l = localStorage.getItem("wdlt_dates")
    l = JSON.parse(l)
    if(l.find( e => e === arg.dateStr) !== undefined) {
    
      props.setDiaryEntries(props.storedEntries[arg.dateStr])
      //props.setDiaryDay(props.setDiaryDay[arg.dateStr])
      //setDiaryDay(arg.dateStr)
      //setCurrentDate(arg.dateStr)
    }
    else {
      //setCurrentDate(arg.dateStr)
      let newDiaryDay = props.diaryDay
      let key
      for(key in props.storedEntries) {
        if(key !== props.diaryDay) {
          newDiaryDay = key
      }
    }
      //setDiaryDay(newDiaryDay)
      props.setDiaryEntries(props.storedEntries[newDiaryDay])
    }
  }

 
  const [refresh,setRefresh] = useState({})
  const [diaryDay, setDiaryDay] = useState("")

    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        events = {ev}
      />
    )
}