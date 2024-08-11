//---IMPORTS---
//document
import document from "document";
//----
//helper imports
//----
//system imports
//----
//local file imports
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

//utils

export function timePrefrence (preference, hours){
  //switch between time prefrences from system
  if (preference === "12h") {
    return zeroPad(hours % 12 || 12, 2);
  } else {
    return zeroPad(hours, 2);
  }
}

export function zeroPad(num, targetLength) {
  //add 0's to front of a number for easier display
  let numStr = num.toString();
  while (numStr.length < targetLength) {
    numStr = "0" + numStr;
  }
  return numStr;
}


export function writtenDay(targetDay){
  //sunday should remain at the beginning
  let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  return days[targetDay];
}


export function dateSuffixCreator(date) {

  let result = ""

  if (date > 3 && date < 21) {
    result = "th"
  };


  switch (date % 10) {
    case 1:
    result = "st";
    break;
    case 2:
    result = "nd";
    break;
    case 3:
    result = "rd";
    break;
    default:
    result = "th";
    break;
  }

  return result
}

export function writtenMonth(targetMonth){
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[targetMonth];
}

//helpers

export function animationObjectify(framesArray){
  return framesArray.map(frame => ({ frame }));
}

//toggleVisibility
export function toggleVisibility(element){
  //switch visibilty from current state to other
  element.style.visibility = element.style.visibility === "visible" ? "hidden" : "visible";
}

export function toggleManyVisibility(elements){
  console.log("toggle many");
  //change visibilty of all elements in an array
  elements.forEach((element) => {
    toggleVisibility(element)
  });
}

export function toggleOpacity(handle){
  //toggle between max and mix opacity, this allows for elements to not appear which still remaining visible fpr clicks ect
  let currentOpacity = parseFloat(handle.style.opacity);
  return isNaN(currentOpacity) ? 1 : (currentOpacity === 0 ? 1 : 0);

}


export function whichFish() {
  // pick a random fish to display
  let randomPercentage =  Math.floor(Math.random() * 100) + 1
  let result = ""
  if (randomPercentage <= 10)
  //boot
  {
    result = 0;
  } else if (randomPercentage >= 11 && randomPercentage <= 50)
  //anchovy
  {
    result = 1;
  } else if (randomPercentage >= 51 && randomPercentage <= 75)
  //bream
  {
    result = 2;
  } else if (randomPercentage >= 76 && randomPercentage <= 95)
  //crimson
  {
    result = 3;
  } else if (randomPercentage >= 96)
  //blobfish
  {
    result = 4;
  }

  return result

}

export function switchCornerButtons(group1Visibilty, group2Visibilty, group3Visibilty) {

  //decide which corner buttons are visible

  // grab all potential corner buttons
  //food and fish buttons
  let timerButtonElements = document.getElementById("timerButtons");
  //color select buttons
  let colorButtonElements = document.getElementById("colorSelectionButtons");
  // button to delete alarms
  let deleteButtonElements = document.getElementById("deleteButtons")

  timerButtonElements.children.forEach((timerButtonsElement) => {
    timerButtonsElement.style.visibility = group1Visibilty;
  });

  colorButtonElements.children.forEach((colorButtonsElement) => {
    colorButtonsElement.style.visibility = group2Visibilty;
  });

  deleteButtonElements.children.forEach((deleteButtonElement) => {
    deleteButtonElement.style.visibility = group3Visibilty;
  });

}

//event listeners

export function eventListenersHandler(listenersClickables, setUpOrRemoveFunction){
  listenersClickables.forEach(({ button, callback }) => {
    setUpOrRemoveFunction(button, callback);
  });
}

export function eventListenerSetup(button, callback){
  button.addEventListener("click", callback);
}

export function eventListenerRemoved(button, callback){
  button.removeEventListener("click", callback);
}
