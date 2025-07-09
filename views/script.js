const params =new URLSearchParams(window.location.search);
const userId = params.get('userId');

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const API_URL = "http://localhost:5000/api/tasks"; // backend endpoint

// Load existing tasks on page load
window.addEventListener("DOMContentLoaded", loadTasks);

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  try {
    // Send POST request to add task
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
      body: JSON.stringify({ text,userId })
    });

    const newTask = await res.json();
    addTaskToDOM(newTask); // Update UI
    input.value = ""; // Clear input
  } catch (err) {
    console.error("Error adding task:", err);
  }
});

// Fetch all tasks from server and show in DOM
async function loadTasks() {
  try {
    const res = await fetch(API_URL,{
      credentials:"include"
    });
    const tasks = await res.json();
    list.innerHTML = ""; // Clear list
    tasks.forEach(addTaskToDOM);
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

// Add a single task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;


  // Toggle Done Button
  li.addEventListener("click", async () => {
    const res=await fetch(`${API_URL}/done`, { 
      method: "PATCH",
      headers: {
      "Content-Type": "application/json"
      },
      credentials:"include",
      body:JSON.stringify({id:task._id})
     });
     li.classList.toggle("done");
  });

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const res=await fetch(`${API_URL}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json"
      },
      credentials:"include",
      body:JSON.stringify({id:task._id})
     });
     if(res.ok){
      li.remove(); // Remove from DOM
     }
    
  });

  li.appendChild(deleteBtn);
  if(task.done)
    li.classList.add('done')
  list.appendChild(li);
}
