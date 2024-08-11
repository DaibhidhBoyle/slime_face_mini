//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { eventListenersHandler, eventListenerRemoved, eventListenerSetup } from '../Helper/helper.js';
import { sleepBubble as sleepBubbleElement, animateDisplayElements as animateSleepElements} from '../Helper/components.js';
//----
//system imports
import { BodyPresenceSensor } from "body-presence";
//----
//local file imports
//----
//external file imports
import { fadeElement, widgetAnimation } from '../Display/animations.js';
//----
//----

//---EXPORTS---
//variables
export let bodyPresence;
export let sleepBubble;
export let buttonsAndCallbacksWithoutSleep;
//----
//display elements
//----
//----

//---BODY---
//variables
let previousBodyPresence = null;
//----
//main body


export function sleepBoot(slime, sleepSlime, allButtonsAndCallbacks) {
  //set display to "asleep" (with a snoozing slime) if not on wrist

  // grab all non sleep event listeners to be deactivated when "asleep" and renabled when "awake"

  buttonsAndCallbacksWithoutSleep = allButtonsAndCallbacks.filter(buttonsAndCallback => buttonsAndCallback.button !== sleepSlime)

  //initalise body presence sensor to see if fitbit is on wrist
  if (BodyPresenceSensor) {
    bodyPresence = new BodyPresenceSensor();
    //check if fitbit is on wrist per tick
    bodyPresence.onreading = () => checkBodyPresence(slime, sleepSlime, sleepBubbleElement, animateSleepElements);
    bodyPresence.start();
  } else {
    console.log("No body sensor.");
  }

}


function checkBodyPresence(slime, sleepSlime, sleepBubble, animateSleepElements) {

  //take action dependant on wether fitbit is on wrist or not
  if (bodyPresence && bodyPresence.present && !previousBodyPresence) {
    // Body presence changed to present
    wakeMode(slime, sleepSlime, sleepBubble, animateSleepElements);
  } else if (!bodyPresence.present && previousBodyPresence) {
    // Body presence changed to not present
    sleepMode(slime, sleepSlime, sleepBubble, animateSleepElements);
  }

  // Update previous state
  previousBodyPresence = bodyPresence.present;

}


export function sleepMode(slime, sleepSlime, sleepBubble, animateSleepElements) {

  //toggle main slime to sleep slime and make a pulsing sleep bubble
  sleepSlime.style.visibility = "visible"
  slime.style.visibility = "hidden"
  widgetAnimation(sleepBubble);
  // hide all informatics by fading out
  fadeElement(animateSleepElements, 1, 0);
  // stop all elements from activating on click apart from sleep slime
  eventListenersHandler(buttonsAndCallbacksWithoutSleep, eventListenerRemoved);

}

export function wakeMode(slime, sleepSlime, sleepBubble, animateSleepElements) {

  if (slime.style.visibility !== "visible"){

    //hide sleep elements
    slime.style.visibility = "visible"
    sleepBubble.style.visibility = "hidden"
    sleepSlime.style.visibility = "hidden"
    //fade back in all infomatics
    fadeElement(animateSleepElements, 0, 1);
    sleepBubble.animate("disable");
  }
  //reactivate all elements abilty to be clicked
  eventListenersHandler(buttonsAndCallbacksWithoutSleep, eventListenerSetup);

}
