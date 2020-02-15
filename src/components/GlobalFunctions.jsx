import React,{createContext} from 'react'
export default function Globals() {
    console.log("Work Diary LT, Ver .1 Beta")
}


let StatusEnum = {
    RUNNING: 1,
    PAUSED: 2,
    COMPLETED: 3,
    NOTSTARTED: 4,
    APPSTARTED: 5,
}

const DataCache = {
    cache:{
      data: "Some Data"
    }
  }
  
  const Context = createContext(DataCache.cache)

export {StatusEnum,Context,DataCache}