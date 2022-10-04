import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import {getStoredEntries} from '../../Utility'

export default function Calendar(props) {
  let ev = []
  for(const prop in props.storedEntries) {
    ev.push( { 
      title: props.storedEntries[prop].length,
      date: prop
    })
  }
 
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        events = {ev}
      />
    )
  

  function handleDateClick(arg) { // bind with an arrow function
    props.setDiaryDay(props.storedEntries[arg.dateStr])
  }
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