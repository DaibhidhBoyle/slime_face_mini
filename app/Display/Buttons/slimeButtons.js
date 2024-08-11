//---IMPORTS---
//document
//----
//helper imports
import { jumpFramesUnaltered, timerButtonElements, slimeButtonState } from '../../Helper/components.js';
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
    handleSlimeButtonClick(toggableHTMLElements, clickData, jumpFrames, jumpFrameTimes);
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

function handleSlimeButtonClick(toggableHTMLElements, clickData, slimeFrames, slimeTimes) {
  //toggle between base view and color select screen
  toggleManyVisibility(toggableHTMLElements);
  //send to animate.js
  startButtonAnimation(slimeFrames, slimeTimes, clickData);
}
