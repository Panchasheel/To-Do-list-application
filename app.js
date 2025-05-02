const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(taskText = taskInput.value.trim(), completed = false) {
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="task-item">
      <input type="checkbox" ${completed ? 'checked' : ''} onchange="toggleTask(this)">
      <span class="task-text ${completed ? 'completed' : ''}">${taskText}</span>
    </div>
    <button onclick="deleteTask(this)" class="delete-btn">Delete</button>
  `;

  taskList.appendChild(li);
  taskInput.value = '';
  saveTasks();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();
}

function toggleTask(checkbox) {
  const span = checkbox.nextElementSibling;
  span.classList.toggle('completed', checkbox.checked);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('.task-text').innerText;
    const completed = li.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Only load tasks that are not completed
  savedTasks.forEach(task => {
    if (!task.completed) {
      addTask(task.text, false);
    }
  });
}
