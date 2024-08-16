//---IMPORTS---
//document
//----
//helper imports
import { eat, foodAnimation, foodButtons } from '../../Helper/components.js';
import { animationObjectify } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import { startButtonAnimation, widgetAnimation } from '../animations.js';
import { makeHappy } from '../../Slime/mood.js';
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

export function foodButton(mainSlime, clickData) {

  // initialise frames
  let eatFrames = setupEatFrames(mainSlime);

  //set up time between frames aniamtions
  let eatFrameTimes = [0, 675, 400, 266, 400, 266, 0];

  //process when button pushed
  let foodClick = () => handleFoodButtonClick(clickData, eatFrames);

  //return to be processed into event listener by button.js
  return foodButtons.map(button => ({ button, callback: foodClick }));
}

function setupEatFrames(mainSlime) {
  //prep eat aniamtion frame order
  let eatFrames = [mainSlime, eat, mainSlime, eat, mainSlime, eat, mainSlime];
  eatFrames = animationObjectify(eatFrames);
  return eatFrames;
}

function handleFoodButtonClick(clickData, eatFrames) {
  // check what food will appear
  let prizeFoodAnimation = foodAnimation[Math.floor(Math.random() * foodAnimation.length)];
  // 30 minutes sent to be happy
  makeHappy(1 * 60 * 1000, true);
  //send to animate.js to show slime eating
  startButtonAnimation(eatFrames, [0, 675, 400, 266, 400, 266, 0], clickData);
    //send to animate.js to show food being eaten
  widgetAnimation(prizeFoodAnimation, 2000);
}
