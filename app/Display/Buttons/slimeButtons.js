//---IMPORTS---
//document
//----
//helper imports
import { jumpFramesUnaltered, timerButtonElements, colorButtonElements, tumblerHour, tumblerMin, slimeButtonState } from '../../Helper/components.js';
import { animationObjectify, toggleManyVisibility } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
import { startButtonAnimation } from '../animations.js';
//----
//external file imports
import { getTumblersInfo } from '../../Alarm/setUpAlarmTumbler.js';
import { slimeButtonClickFunctionality } from '../../Alarm/alarmTimeButtons.js';
import { sendToAlarm, resetScreen, resetAlarmElements } from '../../Alarm/alarmDayButtons.js';
//----

//---EXPORTS---
//variables
//----
//display elements
//----
//----

//---BODY---
//variables
let alarmElementListeners;
//----
//main body

export function slimeButton(mainSlime, toggableHTMLElements, clickData) {

  // initialise frames
  let jumpFrames = setupJumpFrames(mainSlime);

  //set up time between frames aniamtions
  let jumpFrameTimes = [0, 75, 75, 75, 75, 75, 75, 1700, 1000, 0]

  //process when button pushed
  let slimeClick = () => {
    handleSlimeButtonClick(mainSlime, toggableHTMLElements, clickData, jumpFrames, jumpFrameTimes);
  };

  //return to be processed into event listener by button.js
  return { button: mainSlime, callback: slimeClick };
}

function setupJumpFrames(mainSlime) {
  //prep jump animation frame order
  let jumpFrames = jumpFramesUnaltered;
  jumpFrames = [mainSlime, ...jumpFrames.slice(0, 4), ...jumpFrames.slice(3, 0).reverse(), ...jumpFrames.slice(4), mainSlime];
  jumpFrames = animationObjectify(jumpFrames);
  return jumpFrames;
}

function handleSlimeButtonClick(mainSlime, elements, clickData, slimeFrames, slimeTimes) {
  //depending on slimeButtonsState excute action on click
  if (slimeButtonState === 1) {
    //toggle between base view and color select screen
    toggleManyVisibility(elements);
    toggleManyVisibility([...timerButtonElements.children, ...colorButtonElements.children])
  } else if (slimeButtonState === 2) {
    //after a clock button click, take time on alarm tumbler and pass to alarmDayButtons to be put into alarms, then switch to alarm day select screen
    let tumblerElements = getTumblersInfo(tumblerHour, tumblerMin);
    alarmElementListeners = slimeButtonClickFunctionality(tumblerElements);
  } else if (slimeButtonState === 3) {
    //set up alarm and switch to base view
    sendToAlarm();
    resetScreen();
    resetAlarmElements(alarmElementListeners);
  }
  //send to animate.js
  startButtonAnimation(slimeFrames, slimeTimes, clickData);
}
