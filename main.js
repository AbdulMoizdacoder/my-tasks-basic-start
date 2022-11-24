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

 
// Toggle completed status of a task
function toggleTask(){
  let index = +prompt('Enter # of task:');
  let task = tasks[index];
  if(task.completed === ''){
    task.completed = 'completed';
  } else{
    task.completed = ' ';
  }
  saveTasks();
  displayAll();
}

function removeTask() {
  // Remove a task
  let index = +prompt("Enter # of task:");
  if(index >= 0 && index < tasks.length){
    // Valid Index -> Remove
    tasks.splice(index,1)
    saveTasks();
    displayAll();
  }else{
    alert("Invalid Task #")
  }
}

function clearAll() {
  // Clear all tasks
  tasks = [];
  saveTasks();
  displayAll();
}

// Helper Functions
// Return a new task object
function newTask(taskDescription){
  return{
    description : taskDescription,
    completed : '',
  };
}
// Display all tasks in global tasks array
function displayAll(){
  let outputStr = ' ';
  for(let i = 0; i < tasks.length; i++){
    outputStr += getTaskHTMLStr(tasks[i],i);
  }
  tasksEl.innerHTML = outputStr;
}

// Get html for given task
function getTaskHTMLStr(task, index){
  // Use javascript to build the Task <div>
 
  // Check Box Element
  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  // Task Descritption Text Node
  let textEl = document.createTextNode(task.description);

  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove"

  let divEl = document.createElement("div");
  divEl.appendChild(checkBoxEl);

  console.log(divEl);
  return `
  <div>
  <input type = "checkbox">
  ${task.description}
  <button>Remove</button>
  </div>
  `;
}

function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function initTasks(){
  let tasksStr = localStorage.getItem('tasks');
  return JSON.parse(tasksStr) ?? [];
}