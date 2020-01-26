import React from 'react'
import '../assets/scss/ToggleIcon.css'

export default function Button({onToggleHandler}) {
    return <span className="toggle-icon" onClick={onToggleHandler}></span>
}