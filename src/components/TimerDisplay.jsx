import React from 'react'
import ToggleIcon from './ToggleIcon'
import '../assets/scss/TimerDisplay.css'


export default function TimerDisplay({text,time,toggle,onToggleHandler}) {
    let toggleComponent = ""
    let toggleClass = ""
    if(toggle !== undefined) {
        toggleComponent = <ToggleIcon onToggleHandler={onToggleHandler}/>
        toggleClass = "toggle"
    }
    
    return <div className="timer-display">
        <h5>{text}</h5>
        <div className={"clock " + toggleClass}>{time} {toggleComponent}</div>
    </div>
}