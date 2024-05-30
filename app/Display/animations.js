//---IMPORTS---
//document
import document from "document";
//----
//helper imports
import { toggleVisibility, toggleOpacity, whichFish } from '../Helper/helper.js';
//----
//system imports
//----
//local file imports
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

export function startButtonAnimation(frames, animationTimes, clickData, secondaryAnimationTime = null, secondaryAnimationCallback = null, ) {
  // establish time for animation
  let timeFrames = [...animationTimes]
  //activate animation
  if (typeof secondaryAnimationCallback === 'function') {
    visibilityAnimation(frames, timeFrames, secondaryAnimationCallback);
    timeFrames.push(secondaryAnimationTime);
  } else {
    visibilityAnimation(frames, timeFrames);
  }
  //stop buttons from being pushed during animation
  disableButtonForAnimation(clickData, timeFrames);
}


async function visibilityAnimation(frames, times, callback = null) {
  for (let i = 1; i < frames.length; i++) {
    //if any frames have extra frames they will activate at the same time as main aniamtion
    if (frames[i].extraFrame) {
      extraFrameAnimation(frames[i].extraFrame);
    }

    //flicker between frames
    //make new frame visible
    toggleVisibility(frames[i].frame);

    //make previous frames invisible
    if (frames[i - 1].extraFrame && frames[i - 1].extraFrame.animationType === "snap") {
      extraFrameAnimation(frames[i - 1].extraFrame);
    }
    toggleVisibility(frames[i - 1].frame);

    //wait for next frame uses Promises to make sure the animation is smooth
    await waitForNextFrame(times[i]);
  }

  //activate any "win" animation that isnt dependant on frames from the main animation
  if (typeof callback === 'function') {
    callback();
  }
}

function waitForNextFrame(ms) {
    //Promises to make sure the animation is smooth
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extraFrameAnimation(extraFrameInfo) {
  //running secondary animation by requirements of their animation type
  if (extraFrameInfo.animationType === "snap") {
    extraFrameInfo.extraFrame.style.opacity = toggleOpacity(extraFrameInfo.extraFrame);
  }
  if (extraFrameInfo.animationType === "fade") {
    extraFrameInfo.extraFrame.animate("enable");
  }
}


export function showPrizeFish(frames, duration) {
  //pick a fish to show at the end of the fishing animation
  let prizeFish = whichFish(frames);

  temporaryToggleVisabilty(frames.star.image, duration)
  temporaryToggleVisabilty(prizeFish.image, duration)
}

function temporaryToggleVisabilty(frame, duration){
  //show a frame for a limited time as not part of an animation
  toggleVisibility(frame);
  setTimeout(function () {
    toggleVisibility(frame);
  }, duration);
}



function disableButtonForAnimation(clickData, timeArray) {
  //grab all buttons and make sure they cant be activated during animation
  let sumTime = timeArray.reduce((runningTotal, currentInterartive) => runningTotal + currentInterartive, 0);

  //remove button event for the animation duration then reapply with same event
  clickData.forEach((clickableElement) => {
    clickableElement.button.removeEventListener("click", clickableElement.callback);

    setTimeout(function () {
      clickableElement.button.addEventListener("click", clickableElement.callback);
    }, sumTime);
  });
}

export function fadeElement(elements, from, to){

  //fade an element in or out
  elements.forEach(element => {
    element.from = from
    element.to = to
    element.animate("enable");
  });

}

export function widgetAnimation(targetAnimation, time){
  //start an animation from fitbit built in animation method

  //make element visible for a period time
  targetAnimation.style.visibility = "visible"
  targetAnimation.animate("enable");

  //hide element for after the period time
  if (typeof time === 'number') {
    setTimeout(function () {
      targetAnimation.style.visibility = "hidden"
      targetAnimation.animate("disable");
    }, time);
  }
}
