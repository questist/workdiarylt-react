import React from 'react'
import '../assets/scss/RatingField.css'


export default function RatingField({entry}) {
    let svgs = []


    for(let i = 1;i <= 5;i++) {
        let selectedClass = ""
        let selectedStars = entry.rating
        if(i <= selectedStars && selectedStars !== 0) {
            selectedClass = "star-selected"
        }
        else {
            selectedClass = "star-unselected"
        }
        svgs.push(<svg version="1.1" key={"st"+i} x="0px" y="0px" viewBox="80 64 90 81" >
            <polygon
                onClick={onStarClick}
                onMouseLeave={onStarLeave}
                onMouseEnter={onStarEnter}
                className={"star " + selectedClass }
                id={"st" + i}
                points="124.58,64.42 137.59,94.8 166.7,95.03 145.64,116.56 152.61,144.54 124.58,124.86 96.54,144.54 103.52,116.56 82.45,95.03 111.56,94.8 "/>
            </svg>
        )
    }
    function onStarEnter(e) {
        if(e.target.tagName !== "polygon")
            return
        let id = e.target.getAttribute("id")
        let s = id[id.length -1]
        let stars = document.getElementsByClassName("star")
        Array.prototype.forEach.call(stars,function(el,index) {
            if(index < s) {
                let tokens = el.classList
                tokens.remove("star-unselected")
                tokens.add("star-selected")
            }
        })
    }
    function onStarLeave(e) {
        if(e.target.tagName !== "polygon")
            return
        let id = e.target.getAttribute("id")
        let s = id[id.length -1]
        let stars = document.getElementsByClassName("star")
        Array.prototype.forEach.call(stars,function(el,index) {
            if(index < s && entry.rating <= index) {
                let tokens = el.classList
                tokens.remove("star-selected")
                tokens.add("star-unselected")
            }
        })
    }

    function onStarClick(e) {
        if(e.target.tagName !== "polygon")
            return
        let id = e.target.getAttribute("id")
        let s = id[id.length - 1]
        entry.rating = s
        let stars = document.getElementsByClassName("star")
        Array.prototype.forEach.call(stars, function(el,index) {
            let tokens = el.classList
            if(index < s) {
                tokens.remove("star-unselected")
                tokens.add("star-selected")
            }
            else {
                tokens.remove("star-selected")
                tokens.add("star-unselected")
            }
        })
    }
    return (
        <h4>
            <span>How am I doing?</span>
            {svgs}
            
        </h4>
    )
}