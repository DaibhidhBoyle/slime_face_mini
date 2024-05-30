//---IMPORTS---
//document
//----
//helper imports
import { toggleVisibility, toggleManyVisibility, eventListenerSetup, switchCornerButtons, writtenDay } from '../Helper/helper.js';
import { alarmDayGroup, hourClock, minClock, dateClock, clockColon, tumblerHour, tumblerMin, setSlimeButtonState } from '../Helper/components.js';
//----
//system imports
//----
//local file imports
import { setNewAlarm } from './snooze.js';
//----
//external file imports
//----

//---EXPORTS---
//variables
export let alarmSelectedTime;
export let alarmSelectedDays = [];
export let alarmElements = [];
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

// Function to set the alarm days based on the selected time
export function setAlarmDays(time) {
  // Store the selected time
  alarmSelectedTime = time;

  //pick out elements
  alarmElements = alarmDayGroup.getElementsByTagName("image");

  let sun = alarmElements.filter(element => element.id === "alarmSun");
  sun = sun[0];

  toggleVisibility(sun);

  let alarmMushrooms = alarmElements.filter(element => element !== sun);
  setAllMushrooms(alarmMushrooms, "Red")

  //set up buttons and return
  alarmSelectedDays = [];
  eventListenerSetup(sun, () => toggleSun(sun, alarmMushrooms));

  alarmMushrooms.forEach((mushroom, i) => {
    toggleVisibility(mushroom);
    eventListenerSetup(mushroom, () => toggleMushroom(i, sun, alarmMushrooms));
  });

  return { sun: () => toggleSun(sun, alarmMushrooms), mushroom: (i) => toggleMushroom(i, sun, alarmMushrooms) };
}

function toggleSun(sun, alarmMushrooms) {

  //establish current state
  let isSunUnselected = sun.image === "images/setAlarmDay/unselectedSun.png";
  let newColor = isSunUnselected ? "Green" : "Red";

  //fucntionality -managing which days the alarm will go off
  setAllMushrooms(alarmMushrooms, newColor);
  alarmSelectedDays = isSunUnselected ? [0, 1, 2, 3, 4, 5, 6] : [];

  //switch sun image
  sun.image = isSunUnselected ? "images/setAlarmDay/sun.png" : "images/setAlarmDay/unselectedSun.png";
}

function setAllMushrooms(mushrooms, color) {
  //switches all mushroom to a certain color
  mushrooms.forEach(mushroom => {
    mushroom.image = mushroom.image.replace(/Green|Red/g, color);
  });
}

function toggleMushroom(i, sun, alarmMushrooms) {
  //establish current state
  let mushroom = alarmMushrooms[i];
  let isMushroomUnselected = mushroom.image === `images/setAlarmDay/mushroomRed${i}.png`;

  //fucntionality -managing which days the alarm will go off
  if (isMushroomUnselected) {
    alarmSelectedDays.push(i);
  }

  if (!isMushroomUnselected) {
    let index = alarmSelectedDays.indexOf(i);
    if (index !== -1) {
      alarmSelectedDays.splice(index, 1);
    }
  }

  //switch mushroom/sun image
  mushroom.image = isMushroomUnselected ? `images/setAlarmDay/mushroomGreen${i}.png` : `images/setAlarmDay/mushroomRed${i}.png`;
  sun.image = alarmSelectedDays.length === 7 ? "images/setAlarmDay/sun.png" : "images/setAlarmDay/unselectedSun.png";
}

export function resetScreen() {
  //switch to food and fish buttons
  switchCornerButtons("visible", "hidden", "hidden");

  //switch to base screen, with clock and date (and slime)
  toggleManyVisibility([hourClock, minClock, dateClock, clockColon])
}

export function sendToAlarm() {

  //to be sent to snooze.js to establish alarms
  let dayWrittenOut = [];

  //order days
  //will display wrong days when looked at in delete alarm if not sorted
  alarmSelectedDays.sort(function (a, b) {
    return a - b;
  });

  //change digits to days
  alarmSelectedDays.forEach((dayAsNumber) => {
    let day = writtenDay(dayAsNumber);
    dayWrittenOut.push(day);
  });

  //if there is a day value establish alarm
  if (dayWrittenOut.length > 0) {
    setNewAlarm({ "time": alarmSelectedTime, "days": dayWrittenOut });
  }
}

export function resetAlarmElements(alarmElementListeners) {

  //reset data to base for next time user sets alarm

  alarmSelectedTime = undefined;
  alarmSelectedDays = [];
  tumblerHour.value = 0;
  tumblerMin.value = 0;

  alarmElements.forEach(element => {
    if (element.id === "alarmSun") {
      element.image = "images/setAlarmDay/unselectedSun.png";
    }

    if (element.id !== "alarmSun") {
      element.image = element.image.replace(/Green/g, "Red");
    }
  });

  setSlimeButtonState(1);

  // Reinitialize the alarm days
  setAlarmDays();
}
