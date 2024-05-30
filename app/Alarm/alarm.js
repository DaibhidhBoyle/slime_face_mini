//---IMPORTS---
//document
//----
//helper imports
//----
//system imports
//----
// local files imports
import { alarmTimeBoot } from './alarmTimeButtons.js';
import { deleteAlarmBoot } from './deleteAlarm.js';
import { setupTumblerBoot } from './setUpAlarmTumbler.js';
import { alarmSnoozeBoot } from './snooze.js';
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

export function alarmBoot(mainSlime) {
  setupTumblerBoot();
  alarmSnoozeBoot();
  deleteAlarmBoot();
  alarmTimeBoot();
}
