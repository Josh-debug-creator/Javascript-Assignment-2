const taskName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const button = document.getElementById("add-todo");
const listContainer = document.getElementById("lists");

// Sample initial tasks
const taskArray = [
  { nameOfTask: "cook food", taskDescription: "try cook rice" },
  { nameOfTask: "cook meat", taskDescription: "make it spicy" },
];

// Function to add a new task
function addTodo() {
  if (taskName.value === "" || taskDescription.value === "") {
    alert("Please fill out both fields!");
    return;
  }
  const newTask = {
    nameOfTask: taskName.value,
    taskDescription: taskDescription.value,
  };

  taskArray.push(newTask);
  taskName.value = "";
  taskDescription.value = "";
  displayTodo();
}

// Function to delete a task
function deleteTodo() {
  const targetEle = event.target;
  if (targetEle.classList.contains("delete")) {
    const taskIndex = parseInt(targetEle.parentNode.dataset.index);
    taskArray.splice(taskIndex, 1);
    displayTodo();
  }
}

// Function to edit a task
function editTodo() {
  const targetEle = event.target;
  if (targetEle.classList.contains("edit")) {
    const taskIndex = parseInt(targetEle.parentNode.dataset.index);
    const itemDiv = targetEle.parentNode;
    const currentTask = taskArray[taskIndex];

    // Create input field for editing task name
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.style.width = "150px";
    editInput.value = currentTask.nameOfTask;
    editInput.classList.add("edit-input");
    itemDiv.appendChild(editInput);
    

    // Create save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("save");
    itemDiv.appendChild(saveBtn);

    // Hide edit button
    targetEle.style.display = "none";

    // Add event listener for save button
    saveBtn.addEventListener("click", function() {
      currentTask.nameOfTask = editInput.value;
      itemDiv.removeChild(editInput);
      itemDiv.removeChild(saveBtn);
      targetEle.style.display = "inline"; // Show edit button again
      displayTodo(); // Refresh the list
    });
  }
}

// Function to display tasks
function displayTodo() {
  listContainer.innerHTML = "";
  taskArray.forEach((task, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "item");

    const li = document.createElement("li");
    li.setAttribute("class", "todo-item");
    li.textContent = task.nameOfTask;
    
    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    itemDiv.appendChild(li);
    itemDiv.appendChild(editBtn);
    itemDiv.appendChild(deleteBtn);
    itemDiv.dataset.index = index; // Store the index of the task in the dataset

    listContainer.appendChild(itemDiv);
  });
}

// Event listeners
button.addEventListener("click", addTodo);
listContainer.addEventListener("click", deleteTodo);
listContainer.addEventListener("click", editTodo);

// Initial display of tasks
displayTodo();



