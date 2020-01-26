import React,{useState} from 'react'

export default function PomodoroField({text,value,id,min,max}) {
    const [fieldValue,setFieldValue] = useState(value)

    function onFieldChange(e) {
        let num = Number.parseInt(e.target.value)
        if(e.target.value === "") {
            setFieldValue("")
        }
        else if(isNaN(num)) {
            setFieldValue(min)
        }
        else {
            setFieldValue(Number.parseInt(e.target.value))
        }
    }
    function onBlurChange(e) {
        
        let num = Number.parseInt(e.target.value)
        if(isNaN(num)) {
            setFieldValue(min)
        }
        else if(num > max) {
            setFieldValue(max)
        }
        else if(num < min) {
            setFieldValue(min)
        }
        else {
            setFieldValue(e.target.value) 
        }
    }
    return (
        <label>{text} <input id={id} value={fieldValue} onBlur={onBlurChange} onChange={onFieldChange}/></label>
    )
}