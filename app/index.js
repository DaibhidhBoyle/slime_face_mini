//---IMPORTS---
//document
import document from "document";
//----
//helper imports
//----
//system imports
//----
//local file imports
//----
//external file imports
import { alarmBoot } from './Alarm/alarm.js';
import { buttonsBoot } from './Display/Buttons/buttons.js';
import { timeBoot } from './Display/Infomatics/timeInfo.js';
import { moodBoot } from './Slime/mood.js';
import { sleepBoot } from './Slime/sleep.js';
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


boot();

function boot(){

  //initalise other files

  timeBoot();
  //timeInfo.js -> syste,Info.js
  let allButtons = buttonsBoot();
  // buttons.js -> colorButton.js and deleteButton.js and fishButton.js and foodButton.js and sleepButton.js and slimeButton.js
  alarmBoot(allButtons.main);
  //alarm.js -> (alarmTimeButtons.js -> alarmDayButtons.js) and deleteAlarm.js and setUpAlarmTumbler.js and snooze.js
  moodBoot(allButtons.main);
  //mood.js
  sleepBoot(allButtons.main, allButtons.sleep, allButtons.allButtonsAndCallbacks);
  //sleep.js

  //animate.js, components.js, helper.js have no boot and functions are called when needed

}
