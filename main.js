// COMP1073 Assignment 1, To-Do List
// Mike MacGregor #200232817
// February 11, 2020

// update today's date
let dateString = document.getElementById('todaysDate');
let date = new Date();
dateString.innerText = date.toDateString();

// -------------------
// add task form input
// -------------------

// form container
let addTaskForm = document.querySelector('form');

// create add task text input and submit button
let addTaskInput = document.createElement('input');
let addTaskSubmit = document.createElement('button');
let addTaskSubmitText = document.createTextNode('Add Task');

addTaskInput.setAttribute('type', 'text');
addTaskInput.setAttribute('placeholder', 'what is your new task?');
addTaskInput.setAttribute('id', 'addTaskTextInput');
addTaskInput.setAttribute('class', 'form-control');

addTaskSubmit.setAttribute('type', 'submit');
addTaskSubmit.setAttribute('value', 'Submit');
addTaskSubmit.setAttribute('id', 'addTaskButton');
addTaskSubmit.setAttribute('class', 'btn btn-primary');
addTaskSubmit.appendChild(addTaskSubmitText);

addTaskForm.appendChild(addTaskInput);
addTaskForm.appendChild(addTaskSubmit);

// get the submit button by id
addTaskButton = document.getElementById('addTaskButton');

// add eventListener to submit button, preventing default form submission
addTaskButton.addEventListener('click', function(e) {
  e.preventDefault();
});

// add eventListener to button to trigger function to add task to the list
addTaskButton.addEventListener('click', addTaskToList);


// ----------------
// add task to list
// ----------------

function addTaskToList(e) {
  // task list container
  let taskList = document.querySelector('ul');

  // add task text input box
  let addTaskTextInput = document.getElementById('addTaskTextInput');

  // create new task list item plus complete/incomplete checkbox and delete button
  let addTaskLi = document.createElement('li');
  let addTaskLiText = document.createTextNode(addTaskTextInput.value);
  // this contains the checkbox and remove buttons
  let actionsDiv = document.createElement('div');
  let completeCheckbox = document.createElement('input');
  let deleteButton = document.createElement('button');
  let deleteButtonText = document.createTextNode('Remove');

  addTaskLi.setAttribute('class', 'list-group-item taskIncomplete');

  actionsDiv.setAttribute('class', 'taskActions');

  completeCheckbox.setAttribute('type', 'checkbox');

  deleteButton.setAttribute('type', 'submit');
  deleteButton.setAttribute('value', 'Delete');
  deleteButton.setAttribute('class', 'btn btn-warning');
  deleteButton.appendChild(deleteButtonText);

  // add eventListener to checkbox to mark task complete or incomplete
  completeCheckbox.addEventListener('click', markComplete);

  // add eventListener to delete button to remove task
  deleteButton.addEventListener('click', removeTask);

  actionsDiv.appendChild(completeCheckbox);
  actionsDiv.appendChild(deleteButton);

  addTaskLi.appendChild(actionsDiv);
  addTaskLi.appendChild(addTaskLiText);

  // add to list
  taskList.prepend(addTaskLi);

  // clear text input box
  addTaskTextInput.value = "";

}


// mark a task complete or incomplete by changing color
function markComplete(e) {
  // task list container
  let taskList = document.querySelector('ul');

  // get all of the list items // not used
  // let taskListItems = document.querySelectorAll('li');
  // console.log(taskListItems);

  // get list item this event is referring to
  let thisTaskItem = e.target.closest('li'); // div is the parent, so parent of parent for li
  // console.log(thisTaskItem);

  // index of this item in the list // not used; kept for future reference
  // console.log(Array.from(taskListItems).indexOf(thisTaskItem));
  // let thisTaskItemIndex = Array.from(taskListItems).indexOf(thisTaskItem);

  // mark complete if checkbox is checked using css, and move task to bottom of list
  if(e.target.checked == true) {
    thisTaskItem.setAttribute('class', 'list-group-item taskComplete');

    // move to bottom - remove from list, add to bottom
    thisTaskItem.remove();
    taskList.appendChild(thisTaskItem);
  }
  else { // unmark task as complete, and move task to top of list
    thisTaskItem.setAttribute('class', 'list-group-item taskIncomplete');

    // move to top - remove from list, add to top
    thisTaskItem.remove();
    taskList.prepend(thisTaskItem);
  }

}

function removeTask(e) {
  // get list item this event if referring to
  let taskLi = e.target.closest('li'); // div is the parent, so parent of parent for li
  taskLi.remove();

}

// ----------------
// today in history (frivolity)
// ----------------
let eventType = document.getElementById('eventType');
let events = document.getElementById('events');

// add eventListener to drop-down
eventType.addEventListener('change', updateEvents);

// fire event the first time page is loaded
window.onload = function() {
  eventType.dispatchEvent(new Event('change'));
};

// function to load history data and display
function updateEvents(e) {
  var eventType = e.target.value;

  historyData.load(function(d) {
    // console.log(d.Events);
    let eventData = d[eventType]; // can use Events, Births or Deaths

    // extract only 20th and 21st century
    // find the key for the lowest date that is greater than 1899
    let minKey = 0;
    for(let x = 0; x <= eventData.length; x++) {
      if(eventData[x]['year'] > 1899) {
        minKey = x;
        break;
      }
    }

    // clear prior events content
    events.innerHTML = '';

    // output 10 random entries, track items used to avoid repeats
    let x = 0, y = 0, available = (eventData.length - minKey);
    let usedKeys = [];
    do {

      // pick a random event key
      y = Math.floor(Math.random() * available) + minKey;
      // check not already used
      if(!usedKeys.includes(y)) {
        events.innerHTML += '<p>' + eventData[y]['html'] + '</p>';
        usedKeys.push(y);
      }
      x++;

    } while(x <= (available > 10 ? 10 : available))

  });
}
