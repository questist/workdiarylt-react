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

var initialEntry = {
  index: 0,
  title: "Logging my activities",
  id: "0_welcome",
  start: new Date(),
  end: null,
  notes: "",
  rating: 0,
  isPomodoro: false,
  status: StatusEnum.APPSTARTED,
  duration: 0,
  
  /* computed functions */
  className() {
    if(this.isPomodoro && this.status === StatusEnum.NOTSTARTED) {
        return "entry-pomodoro"
    }
    else if(this.status === StatusEnum.RUNNING) {
        return "entry-selected"
    }
    else {
        return "entry-unselected"
    }
  },
  listingTitle() {
    //status of a Pomodor is the only one that starts at NOTSTARTED
    //entry.start is the only text value for pomodoro not start.date() class like when once it is started
    if(this.status === StatusEnum.NOTSTARTED) {
        return this.start
    }
    //status once the entrylisting has been started once
    else if(this.status === StatusEnum.RUNNING 
            || this.status === StatusEnum.COMPLETED
            || this.status === StatusEnum.PAUSED) {
        return this.start.toLocaleTimeString() + " : " + this.title
    }
    //initial status for the app once it is opened, only one entry that hasn't been started
    else if(this.status === StatusEnum.APPSTARTED) {
        //let title = (entry.title === "Logging my activities")?"Welcome, Start your Work Diary Today":entry.title;
        return this.start.toLocaleTimeString() + " : Welcome, Start your Work Diary Today"
    }
    else {
        throw new Error("EntryListing.setTitleText: Status should not found")
    }
  },
  dialogTitle() {
    let titleLine = ""
    let minutes = Math.ceil(this.duration / 1000 / 60)
    if(!this.isPomodoro || this.status === StatusEnum.COMPLETED) {
            let forString = (this.status === StatusEnum.COMPLETED)?(" for " + minutes + " minutes"):""
            titleLine = "I felt like " + this.title + 
                    " at " + this.start.toLocaleTimeString() + forString
    }
    else {
        
        titleLine = "I will be " + this.title + " for " + minutes + " minutes"
    }
    return titleLine
  },
}

/*
const DataCache = {
    cache:{
      data: "Some Data"
    }
  }
  
  const Context = createContext(DataCache.cache)
*/
export {StatusEnum,initialEntry}