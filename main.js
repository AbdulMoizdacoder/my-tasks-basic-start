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
  let index = +prompt('Enter # of task:');
  let task = tasks[index];
  if(task.completed === ''){
    task.completed = 'completed';
  } else{
    task.completed = " ";
  }
  saveTasks();
  displayAll();
}

function removeTask() {
let taskIndex = +prompt;
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
  let outputStr = ' ';
  for(let i = 0; i < tasks.length; i++){
    outputStr += getTaskHTMLStr(tasks[i],i);
  }
  tasksEl.innerHTML = outputStr;
}

function newTask(taskDescription){
  return{
    description : taskDescription,
    completed : false, 
  };
}

function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskHTMLStr(task, index){
  // Use javascript to build the Task <div>
 
  // Check Box Element
  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.dataset.index = index;
  checkBoxEl.checked = task.completed;
  checkBoxEl.addEventListener("input", checkBoxHandler);


  // Task Descritption Text Node
  let textSpanEl = document.createElement("span");
  textSpanEl.innerHTML = task.description;
  if (task.completed){
  textSpanEl.className = "completed";
  }
  // Remove Button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";
  buttonEl.dataset.index = index;
  buttonEl.addEventListener("click", removeBtnHandler);

  // Add everything to a div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkBoxEl);
  divEl.appendChild(textSpanEl);
  divEl.appendChild(buttonEl);

  // return divEl;
  
  return `
  <div>
  <input type = "checkbox">
  ${task.description}
  <button>Remove</button>
  </div>
  `;
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
  tasks.splice(taskindex,1);
  saveTasks();
  displayAll();
}