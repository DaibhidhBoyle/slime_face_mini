//---IMPORTS---
//document
//----
//helper imports
import { sleepBubble, animateDisplayElements } from '../../Helper/components.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import { wakeMode, sleepMode, bodyPresence } from '../../Slime/sleep.js';
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

export function sleepButton(mainSlime, sleepSlime) {
  //return to be processed into event listener by button.js
  return { button: sleepSlime, callback: () => handleSleepButtonClick(mainSlime, sleepSlime) //process when button pushed };
  }

  function handleSleepButtonClick(mainSlime, sleepSlime) {
    //temporarily activate base view (1 minute)
    wakeMode(mainSlime, sleepSlime, sleepBubble, animateDisplayElements);
    setTimeout(() => {
      if (bodyPresence && !bodyPresence.present) {
        sleepMode(mainSlime, sleepSlime, sleepBubble, animateDisplayElements);
      }
    }, 60 * 1000);
  }
}
