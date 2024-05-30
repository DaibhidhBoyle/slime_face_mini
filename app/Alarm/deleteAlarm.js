//---IMPORTS---
//document
//----
//helper imports
import { alarms } from '../Helper/components.js';
//----
//system imports
//----
//local file imports
import { setUpTumblerStyle, deleteTumblerElement} from './setUpAlarmTumbler.js';
//----
//external file imports
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

export function deleteAlarmBoot() {

  //set up basic styling of tumbler
  setUpTumblerStyle(deleteTumblerElement, "No Alarm Set");

}

export function populateDeleteAlarmTumbler(tumblerElement) {

  //loop through tumbler contents
  for (let i = 0; i <= tumblerElement["numberOfItems"]; i++) {
    let item = tumblerElement["tumbler"].getElementById(tumblerElement["itemIdPrefix"] + i);
    let itemTextContainer = item.getElementById("text");


    //set up styling of delete tumbler depending on contents
    if (alarms[i] !== undefined) {
      let dayIntitals = StringifyDaysInitials(alarms[i].days);
      itemTextContainer.text = alarms[i].time.concat("   ", dayIntitals);
      itemTextContainer.style.fontSize = 50;
    } else {
      itemTextContainer.text = "No Alarm Set";
    }
  }
}

export function StringifyDaysInitials(days) {

  //establish days (keep Sunday at start or wrong days will be grabbed)
  const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  let result = '';

  //change full words for initals to display on delete tumbler
  for (let i = 0; i < daysOfWeek.length; i++) {
    if (days.indexOf(daysOfWeek[i]) !== -1) {
      result += daysOfWeek[i][0] + ' ';
    } else {
      result += '. ';
    }
  }
  return result;
}
