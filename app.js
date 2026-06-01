/* ========================================================
   TaskFlow — app.js
   Features: Add, Complete (toggle), Delete, Filter,
             Clear Completed, Stats, Progress Bar,
             Char Counter, LocalStorage Persistence
   ======================================================== */

// ── DOM References ──────────────────────────────────────
const taskInput     = document.getElementById('taskInput');
const addBtn        = document.getElementById('addBtn');
const taskList      = document.getElementById('taskList');
const emptyState    = document.getElementById('emptyState');
const filterTabs    = document.getElementById('filterTabs');
const clearBtn      = document.getElementById('clearCompleted');
const totalCount    = document.getElementById('totalCount');
const doneCount     = document.getElementById('doneCount');
const pendingCount  = document.getElementById('pendingCount');
const progressBar   = document.getElementById('progressBar');
const charCount     = document.getElementById('charCount');

// ── State ────────────────────────────────────────────────
let tasks        = loadTasks();   // [{ id, text, completed, createdAt }]
let currentFilter = 'all';

// ── Init ─────────────────────────────────────────────────
renderAll();

// ── Event Listeners ──────────────────────────────────────

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// Character counter
taskInput.addEventListener('input', () => {
  const len = taskInput.value.length;
  charCount.textContent = `${len}/120`;
  charCount.style.color = len > 100 ? '#ff5c6c' : '';
});

// Filter tab clicks (event delegation)
filterTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.filter;
  renderList();
});

// Clear completed
clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderAll();
});

// ── Core Functions ────────────────────────────────────────

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    shake(taskInput);
    return;
  }

  const task = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  tasks.unshift(task);   // add to top
  saveTasks();

  taskInput.value = '';
  charCount.textContent = '0/120';
  taskInput.focus();

  renderAll();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderAll();
  }
}

function deleteTask(id) {
  // Animate out first
  const li = taskList.querySelector(`[data-id="${id}"]`);
  if (li) {
    li.classList.add('removing');
    li.addEventListener('animationend', () => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderAll();
    }, { once: true });
  }
}

// ── Render ───────────────────────────────────────────────

function renderAll() {
  renderList();
  updateStats();
}

function renderList() {
  const filtered = getFiltered();
  taskList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
    filtered.forEach(task => {
      taskList.appendChild(createTaskEl(task));
    });
  }
}

function createTaskEl(task) {
  const li = document.createElement('li');
  li.className = `task-item${task.completed ? ' completed' : ''}`;
  li.dataset.id = task.id;

  // Checkbox
  const check = document.createElement('button');
  check.className = 'task-check';
  check.setAttribute('aria-label', task.completed ? 'Mark incomplete' : 'Mark complete');
  check.innerHTML = task.completed ? '✓' : '';
  check.addEventListener('click', () => toggleTask(task.id));

  // Text
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  // Time meta
  const meta = document.createElement('span');
  meta.className = 'task-meta';
  meta.textContent = task.createdAt;

  // Delete button
  const del = document.createElement('button');
  del.className = 'delete-btn';
  del.setAttribute('aria-label', 'Delete task');
  del.innerHTML = '✕';
  del.addEventListener('click', () => deleteTask(task.id));

  li.append(check, span, meta, del);
  return li;
}

function updateStats() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  totalCount.textContent   = total;
  doneCount.textContent    = done;
  pendingCount.textContent = pending;
  progressBar.style.width  = pct + '%';

  // Tint done count when all complete
  doneCount.style.color = (total > 0 && done === total) ? 'var(--accent2)' : '';
}

function getFiltered() {
  switch (currentFilter) {
    case 'active':    return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t => t.completed);
    default:          return [...tasks];
  }
}

// ── Helpers ──────────────────────────────────────────────

function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shakeInput 0.35s ease';
  el.addEventListener('animationend', () => el.style.animation = '', { once: true });
}

// Inline keyframe injection for shake (no extra CSS file needed)
const style = document.createElement('style');
style.textContent = `
  @keyframes shakeInput {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-8px); border-color: var(--danger) !important; }
    40%     { transform: translateX(8px); }
    60%     { transform: translateX(-5px); }
    80%     { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// ── Persistence ──────────────────────────────────────────

function saveTasks() {
  localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
}

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem('taskflow_tasks')) || [];
  } catch {
    return [];
  }
}