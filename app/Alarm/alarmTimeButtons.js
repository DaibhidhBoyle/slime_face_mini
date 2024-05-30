//---IMPORTS---
//document
import document from "document";
//----
// helper imports
import { toggleVisibility, toggleManyVisibility, eventListenerSetup, switchCornerButtons } from '../Helper/helper.js';
import { hourClock, minClock, clockColon, tumblerColon, displayGroup, dateClock, setSlimeButtonState } from '../Helper/components.js';
//----
//system imports
//----
//local file imports
import { setUpTumblerStyle, deleteTumblerElement, tumblerElements } from './setUpAlarmTumbler.js';
import { setAlarmDays } from './alarmDayButtons.js';
//----
//external file imports
//----

//---EXPORTS---
//variables
export let alarmElements = [];
//----
//display elements
//----
//----

//---BODY---
//variables
let clockElements = [];
let cornerButtons = [];
//----
//main body

export function alarmTimeBoot(mainSlime) {

  setAlarmMode(tumblerElements, deleteTumblerElement, mainSlime);

}

function setAlarmMode(tumblerElements, deleteTumblerElement, mainSlime){

  //Grab the clock tumblers
  let tumblers = Object.keys(tumblerElements).map(key => tumblerElements[key].tumbler);

  clockElements = [hourClock, minClock, clockColon];

  //make clock into a button
  clockElements.forEach(clockElement => {
    eventListenerSetup(clockElement, () => handleClockButtonClick(tumblers));
  });


  //add date to clock elements for each switches between screens
  clockElements.push(dateClock);
}

function handleClockButtonClick(tumblers) {

  //make tumblers visible

  toggleVisibility(tumblerColon);

  toggleManyVisibility(tumblers)


 //hide infomatic elements
  displayGroup.forEach(element => {
    element.style.pointerEvents = "none";
    element.style.visibility = "hidden";
  });

  // switch corner buttons to delete tumbler button
  switchCornerButtons("hidden", "hidden", "visible");

  //make it so slime clicks will deal will lock in time on tumbler for alarm, rather than switch infomatics
  setSlimeButtonState(2);
}

//slime click functionality while on the alarm tumbler screen
export function slimeButtonClickFunctionality(tumblerElements) {

  //establish variables for selected tumbler values
  let arrayOfTumblerValues = [];

  ///grab only tumblers
  let arrayOfTumblerInfo = Object.keys(tumblerElements).map(key => tumblerElements[key]);

  //grab tumbler values
  arrayOfTumblerInfo.forEach((tumblerElement) => {
    let selectedIndex = parseInt(tumblerElement.tumbler.value);
    let selectedItem = tumblerElement.tumbler.getElementById(`${tumblerElement.itemIdPrefix}${selectedIndex}`);
    let selectedValue = selectedItem.getElementById("text").text;
    arrayOfTumblerValues.push(selectedValue);
  });

  let arrayOfTumblers = arrayOfTumblerInfo.map(item => item.tumbler);
  let alarmSelectedTime = `${arrayOfTumblerValues[0]}:${arrayOfTumblerValues[1]}`;

  //make it so slime clicks will deal will lock in day selected and switch back to base infomatics screen when selected
  setSlimeButtonState(3);

  return slimeButtonClickSwitchToNextScreen(alarmSelectedTime, arrayOfTumblers);

}

function slimeButtonClickSwitchToNextScreen(time, arrayOfTumblers){

  //hide tumblers and show day select elements

  toggleManyVisibility([...arrayOfTumblers, tumblerColon]);

  toggleManyVisibility(alarmElements)

  //hide all corner buttons

  switchCornerButtons("hidden", "hidden", "hidden");

  //initalize day select functions

  return setAlarmDays(time);
}
