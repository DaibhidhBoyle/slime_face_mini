//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { zeroPad, timePrefrence, writtenDay, dateSuffixCreator, writtenMonth } from '../../Helper/helper.js';
import { hourClock, minClock, dateClock, heartrateHandle } from '../../Helper/components.js';
//----
//system imports
import clock from "clock";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";

//----
//local file imports
//--Infomatics
import { systemSetup} from './systemInfo.js';
//--Buttons
//--Display
//----
//external file imports
//----
//----

//---EXPORTS---
//variables
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

export function timeBoot(){

  //grab clock elements
  let clockHandles = establishClockHandles();

  let hrm = new HeartRateSensor();

  //display time from system
  setUpClock(clockHandles,hrm);



}

function establishClockHandles(){

  //grab hour, minute and date elements and format for easy access
  return {
    time: {hour: hourClock, min: minClock},
    date: dateClock
  }
}

function setUpClock(clockHandles, hrm) {
  // clock will update every second (this also means ontick events happen every second)
  clock.granularity = "seconds";
  // ontick events updating clock and system infomatics
  clock.ontick = (evt) => {
    let now = evt.date;
    updateClock(now, clockHandles, hrm);
  }

}

function updateClock(now, clockHandles, hrm) {
  //update clock displays
  let timeHandles = clockHandles.time;
  let dateHandle = clockHandles.date;

  let timeAsString = getTimeAsString(now, timeHandles);
  let dayAsString = getDayAsString(now);

  updateDate(now, dateHandle);

  //update battery and steps
  systemSetup(now);

  //grab heart rate from system
  let hrm = new HeartRateSensor();

  //update and display heart rate
  hrm.onreading = function() {
    heartrateHandle.text = `${hrm.heartRate}`;
  }

  hrm.start();
}

function getTimeAsString(now, timeHandles) {
  //change all time nums to string for easy comparison and display
  let hours = now.getHours().toString();
  let mins = now.getMinutes().toString();

  let hoursFormatted = timePrefrence(preferences.clockDisplay, hours)
  let minsFormatted = zeroPad(mins, 2);

  //display time
  timeHandles.hour.text = `${hoursFormatted}`
  timeHandles.min.text = `${minsFormatted}`

  return `${hoursFormatted}:${minsFormatted}`;
}

function getDayAsString(now) {
  //grab day from system and make reable
  //Used for alarms
  let dayAsNumber = now.getDay();
  let day = writtenDay(dayAsNumber);
  return day.toUpperCase();
}

function updateDate(now, dateHandle) {
  //grab date from system and make reable
  let date = now.getDate();
  let month = now.getMonth();

  let suffix = dateSuffixCreator(date);
  let writtenOutMonth = writtenMonth(month);

  dateHandle.text = `${date}${suffix} ${writtenOutMonth}`;
}
