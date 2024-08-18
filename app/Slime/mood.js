//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { sleepSlime, sleepBubble } from '../Helper/components.js';
//----
//system imports
import { vibration } from "haptics";
//----
//local file imports
//----
//external file imports
import { getSlimeImagePath } from '../Display/Buttons/colorButtons.js';
import { widgetAnimation } from '../Display/animations.js';
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
let moodSlime;
let timeTillSad;
let slimeCheckInterval;
//-
//----
//main body



export function moodBoot(slime) {
  moodSlime = slime
}

export function makeHappy(time, isFromFood){
  let restTime = 5 * 60 * 1000
  //change main slime to "happy" version for a period of time
  moodSlime.image = `${getSlimeImagePath()}mainSlime_1.png`;
  if(sleepBubble.style.visibility === "visible"){
    sleepBubble.style.visibility = "hidden"
  }
  if (!isFromFood){
    //switch back to sad after period of time
    resetTimeout(time, makeSad);
  } else {
    resetTimeout(time, () => {
      rest(restTime);
      resetTimeout(restTime, makeSad);
    });
  }
}

export function makeSad(){

  //set of vibration and change main slime to "sad" or "deflated" version

  if (sleepSlime.style.visibility !== "visible"){
    vibration.start("nudge-max");
  }
  clearInterval(slimeCheckInterval);
  moodSlime.image = `${getSlimeImagePath()}sadSlime_1.png`;
  // set vibration after period of time
  slimeCheckInterval = setInterval(slimeCheckIn, 5 * 60 * 1000);
}

function rest(time){
  vibration.start("nudge-max");
  moodSlime.image = `${getSlimeImagePath()}sleepSlime_1.png`
  widgetAnimation(sleepBubble, time);
}

function resetTimeout(time, callback) {
  if (timeTillSad) {
    clearTimeout(timeTillSad);
  }
  timeTillSad = setTimeout(callback, time);
}

function slimeCheckIn(){

  // send vibration after period of time to demand attention
  if (moodSlime.image === `${getSlimeImagePath()}sadSlime_1.png`) {
    if (sleepSlime.style.visibility !== "visible"){
      vibration.start("nudge");
    }
  }

}
