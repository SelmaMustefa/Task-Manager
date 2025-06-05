let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true }
];

let currentFilter = 'all';

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'pending') return !task.completed;
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<li style="text-align:center;color:#6c757d">No tasks found.</li>';
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task';

    const span = document.createElement('span');
    span.textContent = task.title;
    if (task.completed) span.classList.add('completed');
    span.onclick = () => toggleComplete(task.id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active-filter'));
  document.getElementById(`filter-${currentFilter}`).classList.add('active-filter');
}

function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) {
    alert("Task title can't be empty.");
    return;
  }
  tasks.unshift({ id: Date.now(), title, completed: false });
  input.value = '';
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

window.onload = renderTasks;
