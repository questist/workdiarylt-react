//import React,{createContext} from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
export default function Globals() {
    console.log("Work Diary LT, Ver .1 Beta")
}


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "blank"
});

let StatusEnum = {
    RUNNING: 1,
    PAUSED: 2,
    COMPLETED: 3,
    NOTSTARTED: 4,
    APPSTARTED: 5,
}

/*
const DataCache = {
    cache:{
      data: "Some Data"
    }
  }
  
  const Context = createContext(DataCache.cache)
*/
export {StatusEnum}