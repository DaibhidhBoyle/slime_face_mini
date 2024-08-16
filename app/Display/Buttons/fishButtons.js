//---IMPORTS---
//document
import document from "document"
//----
//helper imports
import { fishFramesUnaltered, exclaimationAnimation, fishPrizeAnimation, fishButtons } from '../../Helper/components.js';
import { animationObjectify, whichFish } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import { startButtonAnimation, widgetAnimation, showPrizeFish } from '../animations.js';
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

export function fishButton(mainSlime, clickData) {

  // initialise frames
  // primary animation
  let fishFrames = setupFishFrames(mainSlime);
  //secondary animation
  let fishPrizeFrames = setupFishPrizeFrames();

  //set up time between frames aniamtions
  let fishFrameTimes = [0, 75, 75, 75, 75, 75, 75, 1550, 500, 1500, 500, 1500, 1000, 2500, 0];

  //process when button pushed
  let fishClick = () => {
    handleFishButtonClick(
      fishFrames,
      fishFrameTimes,
      clickData
    );
  };

  //return to be processed into event listener by button.js
  return fishButtons.map(button => ({ button, callback: fishClick }));
}

function setupFishPrizeFrames() {
  //initialise all possible fish win frames with star background
  return {
    boot: { image: document.getElementById("boot"), text: "boot" },
    anchovy: { image: document.getElementById("anchovy"), text: "anchovy" },
    bream: { image: document.getElementById("bream"), text: "bream" },
    crimson: { image: document.getElementById("crimson"), text: "crimson" },
    blobfish: { image: document.getElementById("blobfish"), text: "blob" },
  };


}

function setupFishFrames(mainSlime) {
  //prep fish animation frame order

  let fishFrames = fishFramesUnaltered;
  fishFrames = [mainSlime, ...fishFrames, fishFrames[6], fishFrames[7], fishFrames[6], fishFrames[7], mainSlime, mainSlime];

  return fishFrames;
}

async  function handleFishButtonClick(fishFrames, fishFrameTimes, clickData) {
  // 1 hour passed to makeHappy
  makeHappy(60 * 60 * 1000);
  let fishPrizePosition = whichFish();

  let fishFrameWithPrize = await addPrizeToFrames(fishFrames, fishPrizePosition);

  //send to animate.js
  startButtonAnimation(fishFrameWithPrize, fishFrameTimes, clickData);
  widgetAnimation(exclaimationAnimation, 7000);
}

function addPrizeToFrames(fishFrames, fishPrizePosition) {
  // Create a shallow copy of fishFrames to avoid modifying the original array
  let addPrizetoFishFrames = [...fishFrames];

  // Modify the copied array
  addPrizetoFishFrames[13] = fishPrizeAnimation[fishPrizePosition];

  // Return the modified array processed by animationObjectify
  return animationObjectify(addPrizetoFishFrames);
}
