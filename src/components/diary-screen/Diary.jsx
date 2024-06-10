import React from 'react'
import {StatusEnum} from '../GlobalFunctions'
import DiaryEntries from '../DiaryEntries'
import Calendar from './Calendar'
import '../../Utility'
import { initialDiaryEntry } from '../GlobalFunctions'

export default function Diary() {

      //const [currentDay, setCurrentDay] = useState(null)
      
      
    return (
        <div><div>"Welcome to the Diary"</div>
            <div className="today-select">
            <div className="quick-selects-section">
                <Calendar
                    
                />
            
            </div>
            <DiaryEntries entries={[initialDiaryEntry]}/>
            </div>
        </div>
    )
}