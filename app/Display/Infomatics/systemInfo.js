//---IMPORTS---
//document
//----
//helper imports
import { zeroPad } from '../../Helper/helper.js';
import { batteryHandle, stepsHandle  } from '../../Helper/components.js';
//----
//system imports
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { battery } from "power";
//----
//local file imports
//--Infomatics
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

export function systemSetup(now){

  //battery
  let { chargeLevel } = battery;
  batteryHandle.text = `${chargeLevel} %`;

  //steps and pad with zeros
  let steps = today.adjusted?.steps || 0;
  stepsHandle.text = zeroPad(steps, 5);

}
