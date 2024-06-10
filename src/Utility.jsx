import {initialEntry} from './components/GlobalFunctions'

function getDate() {
    let date = new Date();
    let formattedDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }
    
    formattedDate.month = ('0' + formattedDate.month).slice(-2);
    formattedDate.day = ('0' + formattedDate.day).slice(-2);
    
    return formattedDate.year + "-" + formattedDate.month + "-" + formattedDate.day;
}

//TODO: Stopped here on 9/30/22
function addDummyData() {
    localStorage.clear();
    let setdates = ["2022-09-22","2022-09-26","2022-09-30","2022-10-01","2022-10-03"];

    let numdailyact = [4,6,3,10,4]
    let numratingarr = [3,1,2,3,3,2,1,1,2,4]
    numdailyact.forEach( (e,index) => {
        let tmpentries = [];

        let timestamp = new Date().getTime();
        for(let i = 0; i < numdailyact[index]; i++) {
            let ine = {
                index: i,
                title: "My Daily Activity: ",
                id: "_welcome",
                start: new Date(),
                end: null,
                notes: "Happy Happy " +  "(" + index + ")" + setdates[index] + " Enjoy Enjoy",
                rating: 0,
                isPomodoro: false,
                duration: 0,
                status: 3
            }
            ine.title = ine.title + "(" + index + ")" + setdates[index]; 
            ine.rating = numratingarr[i]
            ine.id = i + setdates[index] + ine.id

            timestamp = timestamp + (105 * 1000)
            let date = new Date(timestamp);

            ine.start = date
            timestamp = timestamp + (numratingarr[i] * 75 * 1000)
            date = new Date(timestamp);
            ine.end = date
            ine.duration = numratingarr[i] * 75 * 1000
            const newobj = Object.assign({}, ine);
            tmpentries.unshift(newobj)
        }

        localStorage.setItem("wdlt_" + setdates[index],JSON.stringify(tmpentries))
    })
    localStorage.setItem("wdlt_dates",JSON.stringify(setdates))


}

//adds all entries to local storage
//uses full entries list in memory
function saveTodaysEntries(entries) {
    //all existing dates currently saved for fast reference in app and in local storage
    //error checking upon load and ability to fix a corrupted wdlt storage exist
    let dates = [];
    let todaysdate = getDate();
    let success = false;
    let localdates = localStorage.getItem("wdlt_dates");
    if(localdates === null) {
        dates = [getDate()];
    } else {
        try {
            localdates = JSON.parse(localdates);
            if(Array.isArray(localdates) == false) {
                throw new Error("JSON Parse Error - should have returned an array");
            }
            success = true;
            localdates = localdates.push(todaysdate);  
            
        }
        catch (e) {
            console.log("Utility.jsx; saveTodaysEntries()")
            console.log("Error of Type: " + e);
            console.log(e.name + ": " + e.message);
            //TODO: See if we can recover dates from file or from the full entries obj in local storage
        }
    }    
    

    if(typeof(Storage) !== undefined && success == true) {
      localStorage.setItem("wdlt_" + getDate(),JSON.stringify(entries));
      localStorage.setItem("wdlt_dates",localdates)
    }
    else {
        console.log("Error: Could not write dates")
        console.log("Filename: Utility.jsx; saveTodaysEntries()")
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

function getTodaysSavedEntries() {
    let todaysEntries = localStorage.getItem("wdlt_" + getDate())
    if(todaysEntries) {
        todaysEntries = JSON.parse(todaysEntries)
        if(Array.isArray(todaysEntries) == false) {
            throw new Error("JSON Parse Error - should have returned an array");
        }
        for(let i in todaysEntries) {
            todaysEntries[i] = Object.assign({},initialEntry, todaysEntries[i])
            todaysEntries[i].start = new Date(todaysEntries[i].start)
            todaysEntries[i].end = new Date(todaysEntries[i].end) 
        }
        return todaysEntries
    } else {
        return [initialEntry]
    }
}
//returns an object with property of an array of entries 
//{date -> [{entry},...]}
function getStoredEntries() {
    //addDummyData()
    let localdates = localStorage.getItem("wdlt_dates")
    //TODO: Use ?true:false here if possible
    let success = false
    try {
        /* TODO: May not need this
        if(localdates == null) {
            throw new Error("JSON Parse Error - should have returned an array");
        }*/
        localdates = JSON.parse(localdates)
        if(Array.isArray(localdates) == false) {
            throw new Error("JSON Parse Error - should have returned an array");
        }
        success = true
    } catch(e) {
        console.log("Utility.jsx; getStoredEntries")
        console.log("Could not read wdlt_dates: " + e);
        console.log(e.name + ": " + e.message);
        return false
    }
    
    if(success == true) {

        success = false
        let storedentries = {}
        for( let index = 0; index < localdates.length; index++) {
            try {
       
                let tmpentries = localStorage.getItem("wdlt_" + localdates[index])
                tmpentries = JSON.parse(tmpentries)
                tmpentries.forEach( (e,i) => {
         
                    tmpentries[i] = Object.assign({},initialEntry, tmpentries[i])
                    tmpentries[i].start = new Date(tmpentries[i].start)
                    tmpentries[i].end = new Date(tmpentries[i].end) 
                })
                storedentries[localdates[index]] = tmpentries
                
            } catch (e) {
                console.log("Utility.jsx; getStoredEntries")
                console.log("Could not read wdlt stored date at " + index + " from " + localdates[index]);
                console.log(e);
                console.log(e.name + ": " + e.message);
                return false
            }
        }
        return storedentries
        
    }

    return false
    
}
let storedEntries = getStoredEntries()

async function verifyPermission(fileHandle, readWrite) {
    const options = {};
    if (readWrite) {
      options.mode = 'readwrite';
    }
    // Check if permission was already granted. If so, return true.
    if ((await fileHandle.queryPermission(options)) === 'granted') {
      return true;
    }
    // Request permission. If the user grants permission, return true.
    if ((await fileHandle.requestPermission(options)) === 'granted') {
      return true;
    }
    // The user didn't grant permission, so return false.
    return false;
  }
  
let fileStream3 = null
async function saveDataToFile() {
    // Destructure the one-element array.
  
  if(fileStream3 === null) {
    [fileStream3] = await window.showOpenFilePicker();
  }
  const file = await fileStream3.getFile();
  const content = await file.text();

  const writable = await fileStream3.createWritable();

  let jsondata = formatDataToCSV(storedEntries)
  jsondata = JSON.stringify(jsondata)
  await writable.write(new Blob([jsondata], {type: "text/plain"}));
  
  await writable.close();
}

let fileStream = null
async function loadDataFromFile() {
  
      // Destructure the one-element array.
      if(fileStream3 === null) {
          [fileStream3] = await window.showOpenFilePicker();
      }
  
    const file = await fileStream3.getFile();

  const content = await file.text();
  const jsondata = JSON.parse(content);
  let localdates = []
  let data = {}
  let currentdate = jsondata[0]['date']
  localdates.push(currentdate)
  data[currentdate] = []
  for(let i = 0; i < jsondata.length;i++) {
    if(currentdate !== jsondata[i]['date']) {
        currentdate = jsondata[i]['date']
        let f = localdates.find( e => e === currentdate)
        if(f === undefined) {
            data[currentdate] = []
            localdates.push(currentdate)
        }
    }
    delete jsondata[i]['date']
    let tmp = Object.assign(Object.assign({},initialEntry,jsondata[i]))
    tmp.start = new Date(tmp.start)
    tmp.end = new Date(tmp.end) 
    data[currentdate].push(tmp)
  }
  localStorage.setItem("wdlt_dates",JSON.stringify(localdates))

  for(let i = 0; i < localdates.length; i++) {
    localStorage.setItem("wdlt_" + localdates[i], JSON.stringify(data[localdates[i]]))

  }
  storedEntries = data
}

function formatDataToCSV(data) {
    let csvtowrite = []
    for(const item in data) {
        //let currentDate = data[item]
        let tmp1 = {}
        for(const field in data[item]) {
            let tmp2 = Object.assign({},{date: item},data[item][field])
            csvtowrite.push(tmp2)
        }
        
    }

    //console.log(csvtowrite)

    //const json2csvParser = new Parser();
    //const csv = json2csvParser.parse(csvtowrite);

    //console.log("csvtowrite: " + JSON.stringify(csvtowrite));

    return csvtowrite
}

export { getDate, loadDataFromFile, saveDataToFile, getStoredEntries, getTodaysSavedEntries, storedEntries, addDummyData}