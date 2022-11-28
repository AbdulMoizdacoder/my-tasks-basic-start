// My Tasks Basic Start Code

// 1. FIRST COMPLETE BASIC FUNCTIONALITY
// Write code for the displayTasks, addTask, removeTask and clearAll functions

// 2. THEN IMPLEMENT PERSISTENT DATA
// Add localStorage to make the data persistent (I can help with this)

// HTML Elements
let taskInputEl = document.getElementById("task-input");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

// Global Variables
let tasks = initTasks();
displayAll();

// Go Btn - Menu Listener
taskInputEl.addEventListener("keydown", taskSubmitHandler);

function taskSubmitHandler(e) {
  console.log(e.code)
 if(e.code === "Enter"){
  // Add Submitted Task
  let userTask = taskInputEl.value;
  tasks.push(newTask(userTask));
  saveTasks();
  displayAll();
  taskInputEl.value = "";
  }
}

//  Menu functions
function toggleTask(){
  let taskIndex = +prompt("Please enter number of task to toggle");
  let task = tasks[taskIndex];
  if(task.completed === ""){
    task.completed = "completed";
  } else{
    task.completed = "";
  }
  saveTasks();
  displayAll();
}

function removeTask() {
let taskIndex = +prompt("Please enter number tasks to remove:");
tasks.splice(taskIndex, 1);
saveTasks();
displayAll();
}

function clearAll() {
  // Clear all tasks
  tasks = [];
  saveTasks();
  displayAll();
}

// Helper Functions
  function initTasks(){
    let tasksStr = localStorage.getItem('tasks');
    return JSON.parse(tasksStr) ?? [];
  }

  function displayAll(){
    for(let i = 0; i < tasks.length; i++){
      tasksEl.appendChild(getTaskHTML(tasks[i],i));
    }
  }

  function newTask(taskDescription){
    return{
      description : taskDescription,
      completed : "", 
    };
  }

  function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


function getTaskHTML(task, index){
  // Use javascript to build the Task <div>
 
  // Check Box Element
  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.addEventListener("input", checkBoxHandler);
  // Task Description Text Node
  let textEl = document.createTextNode(task.description);

  // Remove Button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";
  buttonEl.addEventListener("click", removeBtnHandler);


  // Add everything to a div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkBoxEl);
  divEl.appendChild(textEl);
  divEl.appendChild(buttonEl);

  return divEl;
}

 

// Event functions
function checkBoxHandler(e){
  // Get index of tasks to toggle
  let taskIndex = +e.target.dataset.index;
  let task = tasks[taskIndex];
  task.completed = !task.completed;
  saveTasks();
  displayAll();
}
function removeBtnHandler(e){
  // Get index of task to remove
  let taskIndex = +e.target.dataset.index;
  tasks.splice(taskIndex,1);
  saveTasks();
  displayAll();
}