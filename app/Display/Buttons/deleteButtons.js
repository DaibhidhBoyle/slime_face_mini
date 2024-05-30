//---IMPORTS---
//document
//----
//helper imports
import { deleteAlarmButtons, tumblerColon, tumblerHour, tumblerMin, setdeleteButtonState, alarms, tumblerDelete, setSlimeButtonState, deleteButtonState } from '../../Helper/components.js';
import { toggleVisibility, toggleManyVisibility, switchCornerButtons, eventListenerSetup } from '../../Helper/helper.js';
//----
//system imports
//----
//local file imports
//--Buttons
//--Infomatics
//--Display
//----
//external file imports
import { populateDeleteAlarmTumbler } from '../../Alarm/deleteAlarm.js';
import { deleteTumblerElement, setUpTumblerStyle } from '../../Alarm/setUpAlarmTumbler.js';
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

export function deleteButton(mainSlime, baseDisplayElements) {

  //process when button pushed
  let deleteButtonClick = () => {
    handleDeleteTumblerClick(mainSlime, baseDisplayElements);
  };

  //return to be processed into event listener by button.js
  return deleteAlarmButtons.map(button => ({ button, callback: deleteButtonClick }));
};

function handleDeleteTumblerClick(mainSlime, baseDisplayElements) {

  //depending on deleteButtonsState excute action on click
  if (deleteButtonState === 1) {

    //hide clock tumblers and slime
    //make delete tumbler visible
    toggleManyVisibility([tumblerColon, tumblerHour, tumblerMin, mainSlime])

    populateDeleteAlarmTumbler(deleteTumblerElement);

    toggleVisibility(deleteTumblerElement['tumbler']);

    //make it so delete button will delete current tumbler entry in the delete tumbler and reset to base screen instead of bring you to delete tumbler screen
    setdeleteButtonState(2);

  } else if (deleteButtonState === 2) {

    //grab current delete tumbler entry and remove it from alarms array
    let deleteTumblerSelectedIndex = parseInt(deleteTumblerElement.tumbler.value);

    alarms.splice(deleteTumblerSelectedIndex, 1);

    //switch screen back to slime and clock
    deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements);

    //reset tumbler elements style so new string entry is properly styled
    setUpTumblerStyle(deleteTumblerElement, "No Alarm Set");

    //make it so delete button will  bring you to delete tumbler screen isntead of delete current tumbler entry in the delete tumbler
    setdeleteButtonState(1);
  }
}

function deleteSelectSwitchToBaseScreen(mainSlime, baseDisplayElements) {

  //make slime and clock entries visible and hide delete tumbler
  [tumblerDelete, mainSlime, ...baseDisplayElements].forEach(element => toggleVisibility(element));

  //show food and fish corner buttons
  switchCornerButtons("visible", "hidden", "hidden");

  //make is so slime button will toggle between base and color select screen
  setSlimeButtonState(1);

}
