import React,{useState, useEffect,useRef} from 'react'
import TimerDisplay from './TimerDisplay'
import '../assets/scss/timer.css'
import alarm from '../assets/audio/alarm.mp3'
import { StatusEnum } from './GlobalFunctions';

function formatElapsedTime(milliseconds) {
    let time = Math.round(milliseconds/1000)
    let timeString = ''
    function twoDigitTime(t) {
        if(!Number.isInteger(t)) throw new Error("formatElapsedTime.twoDigitTime(): argument is not a number")
        return (t < 10)? "0" + t:t.toString()
    }
    if(time <= 59) {
		timeString = "00:00:" + twoDigitTime(time)
	}
	else if(time >= 60 && time < (60 * 60)) {
        var min = Math.floor(time / 60)
        var sec = time - (min * 60)
		timeString = "00:" + twoDigitTime(min) + ":" + twoDigitTime(sec)
	}
	else if(time >= (60 * 60)) {
		var hours = Math.floor(time / (60 * 60))
		min = Math.floor(time/ 60) - (hours * 60)
		sec = time - (hours * 60 * 60) - (min * 60)
		timeString = twoDigitTime(hours) + ":" + twoDigitTime(min) + ":" + twoDigitTime(sec)
    }
    return timeString
}
export default function Timer({entry,checkEntry,isRunning}) {
    
    const [time,setTimer] = useState(new Date())
    const [showElapsedTime,setShowElapsedTime] = useState(true)
    let timerID = useRef(null);
    
    useEffect(() => {
        timerID.current = setInterval(tick,1000)
        return () => clearInterval(timerID.current)
    })
    function tick() {
        setTimer( new Date() )
        checkEntry(time)
    }

    function onToggleHandler(e) {
        setShowElapsedTime(!showElapsedTime)
    }
    /*
    const [played,setPlayed] = useState(false)
    if((time - startTime) > (5 * 1000) && played === false) {
        let sound = new Audio(alarm)
        sound.play()
        
        setPlayed(true)
    }*/
    let timerTitle = "Elapsed Time"
    let timerTime = formatElapsedTime(time - entry.start)
    let toggle = entry.isPomodoro
    if(!showElapsedTime && entry.isPomodoro) {
        timerTitle = "Time Left"
        if(entry.status === StatusEnum.RUNNING) {
            let milliseconds = entry.duration + entry.start.getTime() - time.getTime()
            timerTime = formatElapsedTime(milliseconds)
            
        }
        else if(entry.status === StatusEnum.PAUSED) {
            let milliseconds = entry.duration + entry.start.getTime() - entry.end.getTime()
            timerTime = formatElapsedTime(milliseconds)
        }
        else if(entry.status === StatusEnum.COMPLETED) {
            timerTime = "00:00"
        }
    }
    return (
        <div className="timer">
            <div>
                <TimerDisplay
                    text="Current Time"
                    time={time.toLocaleTimeString()}
                />
            </div>
            <div>
                <TimerDisplay 
                    text={timerTitle}
                    time={(!isRunning && entry.status !== StatusEnum.PAUSED)?"00:00":timerTime}
                    toggle={toggle}
                    onToggleHandler={onToggleHandler}
                />
            </div>
        </div>
    )
}
