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
displayTasks();

// Go Btn - Menu Listener
taskInputEl.addEventListener("keydown", taskSubmitHandler);

function taskSubmitHandler(e) {
  console.log(e.code)
 if(e.code === "Enter"){
  addTask();
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
  let index = +prompt("Enter# of task:");
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
function getTaskHTMLStr(task, i){
  return `
  <div class ="${task.completed}">
  ${i}: ${task.description}
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