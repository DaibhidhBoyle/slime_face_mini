//---IMPORTS---
//document
//----
//helper imports
import { mainSlime, sleepSlime, eat, jumpFramesUnaltered, fishFramesUnaltered} from '../../Helper/components.js';
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
export let currentColor;
//----
//display elements
//----
//----

//---BODY---
//variables
//----
//main body

//possible colors of slime
let colors = ["Green", "Pink", "White", "Yellow", "Orange", "Red", "Blue", "Purple"];

export function colorButton(clockElements) {
  currentColor = "Green";

  // grab all elements where slime colors are to be changed
  let colorSwitchElements = [mainSlime, sleepSlime, eat, ...jumpFramesUnaltered, ...fishFramesUnaltered];


  //process when button pushed
  let colorClick = () => {
    handleColorButtonClick(colorSwitchElements);
  };

  let colorButtonData = [];
  //pick corner button


  clockElements.forEach((clockElement) => {
    colorButtonData.push({ button: clockElement, callback: colorClick });
  });

  //return to be processed into event listener by button.js
  return colorButtonData;
}

function handleColorButtonClick(mainSlime, colorSwitchElements) {
  //find where we are in color cycle
  let position = colors.indexOf(currentColor);

  if (position !== -1) {
    //find new place in color cycle
    let newPosition = calculateNewPosition(position);

    let newColor = colors[newPosition];

    //change current color and slime colors in display

    changeColor(currentColor, newColor, colorSwitchElements);

    currentColor = newColor;
  }
}

function calculateNewPosition(position, direction) {
  //move position in color cycle depending on which button pushed
    return (position - 1 + colors.length) % colors.length;
}

function changeColor(oldColor, newColor, colorSwitchElements) {
  colorSwitchElements.forEach((element) => {
    replaceColor(element, oldColor, newColor);
  });
}

function replaceColor(element, oldColor, newColor) {
  let colorChangeRegex = new RegExp(oldColor, "g");
  element.image = element.image.replace(colorChangeRegex, newColor);
}
