// My Tasks Basic Start Code

// 1. FIRST COMPLETE BASIC FUNCTIONALITY
// Write code for the displayTasks, addTask, removeTask and clearAll functions

// 2. THEN IMPLEMENT PERSISTENT DATA
// Add localStorage to make the data persistent (I can help with this)

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

// Global Variables
let tasks = loadTasks();
displayAll();

displayTasks();

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "add") {
    addTask();
  } else if (selection === "remove") {
    removeTask();
  } else if (selection === "clear") {
    clearAll();
  }
}

function displayTasks() {
  // Diplay all tasks by putting them in the 'tasksEl' <div>
}

function addTask() {
 let description = prompt("Enter task description");
  tasks.push(newTask(description));
  saveTasks();
  displayAll();
}

function removeTask() {
  // Prompt user for task to remove
  // Remove task from task array (if it exists)
  // Display all tasks to show changes
}

function clearAll() {
  // Clear all tasks
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
function getTaskHTMLStr(task, i){
  return `
  <div>
  ${i}: ${task.description}
  </div>
  `;
}

function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks(){
  let tasksStr = localStorage.getItem('tasks');
  return JSON.parse(tasksStr) ?? [];
}