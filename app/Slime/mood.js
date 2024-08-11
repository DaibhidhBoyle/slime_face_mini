//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { sleepSlime } from '../Helper/components.js';
//----
//system imports
import { vibration } from "haptics";
//----
//local file imports
//----
//external file imports
import { currentColor } from '../Display/Buttons/colorButtons.js';
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

export function makeHappy(time){

  //change main slime to "happy" version for a period of time
  if (moodSlime.image !== `${getSlimeImagePath()}sleepSlime_1.png`) {
    moodSlime.image = `${getSlimeImagePath()}mainSlime_1.png`;
    //switch back to sad after period of time
    resetTimeout(time, makeSad);
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

function getSlimeImagePath() {
  //update slimes to show correctr color reguardless of mood
  return `images/slimes/${currentColor}/`;
}
