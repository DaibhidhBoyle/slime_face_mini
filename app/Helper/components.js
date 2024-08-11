//---IMPORTS---
//document
import document from "document"
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
export let slimeButtonState = 1 //setter function below
export let deleteButtonState = 1 //setter function below
//-
export let alarms = [];
//----
//display elements
//slime elements
export let mainSlime = document.getElementById("slime");
export let sleepSlime = document.getElementById("sleeping");
export let eat = document.getElementById("eating")
//button getElements
export let fishButtons = document.getElementsByClassName("fishClickable");
export let foodButtons = document.getElementsByClassName("foodClickable");
//-
//aniamte elements
export let jumpFramesUnaltered = document.getElementsByClassName("jumpAnimation");
export let animateDisplayElements = document.getElementsByClassName("fadeDisplayElements")
export let sleepBubble = document.getElementById("zzz");
export let fishFramesUnaltered = document.getElementsByClassName("fishAnimation");
export let fishPrizeAnimation = document.getElementsByClassName("fishPrizeAnimation");
export let foodAnimation = document.getElementsByClassName("foodAnimation");
export let exclaimationAnimation = document.getElementById("exclaimationAnimation");
//informatics
//system elements
export let heartrateHandle = document.getElementById("heartrateLabel");
export let stepsHandle = document.getElementById("stepsLabel");
export let batteryHandle = document.getElementById("batteryLabel");
// time elements
export let hourClock = document.getElementById("hourLabel");
export let minClock = document.getElementById("minuteLabel");
export let dateClock = document.getElementById("dateLabel");
export let clockColon = document.getElementById("timeColon");
//-
//groups
export let displayGroup = document.getElementsByClassName("displayElement");
export let baseDisplayElements = document.getElementById("displayElementsBaseView"); // to avoid animate elements grab .children on import
//-
export let timerButtonElements = document.getElementById("timerButtons"); // to avoid animate elements grab .children on import
//----
//----

//---BODY---
//variables
//----
//main body



export function setSlimeButtonState(numberSetting){
  slimeButtonState = numberSetting;
}

export function setdeleteButtonState(numberSetting){
  deleteButtonState = numberSetting;
}
