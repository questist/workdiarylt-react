import React from 'react'
import '../assets/scss/Button.css'

export default function Button({text,onClickHandler,onDetailsHandler,style}) {
    if(onDetailsHandler)
        return (
            <div className="button" onClick={onClickHandler}>
            {text}
            <span className="details-icon"></span>
            </div>
        )
    else
        return <div style={style} className="button" onClick={onClickHandler}>{text}</div>
}