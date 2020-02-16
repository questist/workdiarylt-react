import React,{useState, useEffect,useRef} from 'react'
import TimerDisplay from './TimerDisplay'
import '../assets/scss/timer.css'
import alarm from '../assets/audio/alarm.mp3'

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
        //TODO
        console.log("onToggleHandler")
    }
    /*
    const [played,setPlayed] = useState(false)
    if((time - startTime) > (5 * 1000) && played === false) {
        let sound = new Audio(alarm)
        sound.play()
        
        setPlayed(true)
    }*/
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
                    text="Elapsed Time"
                    time={(!isRunning)?"00:00":formatElapsedTime(time - entry.start)}
                    toggle={true}
                    onToggleHandler={onToggleHandler}
                />
            </div>
        </div>
    )
}
