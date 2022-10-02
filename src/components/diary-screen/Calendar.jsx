import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import {getStoredEntries} from '../../Utility'

export default function Calendar(setCurrentDay) {

  let storedentries = getStoredEntries()
  let ev = []
  for(const prop in storedentries) {
    ev.push( { 
      title: storedentries[prop].length,
      date: prop
    })
  }
    return (
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={ev}
        />
      )
}