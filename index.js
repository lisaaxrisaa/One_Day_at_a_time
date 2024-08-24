document.addEventListener('DOMContentLoaded', function () {
  const d = new Date();
  document.getElementById('date-demo').textContent = d.toDateString();
});

let moodList = [
  'excited',
  'happy',
  'surprise',
  'neutral',
  'trouble',
  'sad',
  'angry',
];

let generateMoodButtons = () => {
  let moodContainer = document.getElementById('mood');
  moodContainer.innerHTML += `
        ${moodList
          .map(
            (mood) => `
    
            <input type="radio" id="${mood}" class="mood-button" name="mood" value="${mood}-face" data-outline="img/${mood}-outline.svg" data-fill="img/${mood}-filled.svg">
            <label for="${mood}">
                <img class="mood-img" src="img/${mood}-outline.svg" alt="${mood} face" width="55" height="55"/>
            </label>
        `
          )
          .join('')}
    `;
};

generateMoodButtons();

let moodButtons = document.querySelectorAll('input[type="radio"]');
let previousButton = null;

for (let i = 0; i < moodButtons.length; i++) {
  const button = moodButtons[i];

  button.addEventListener('click', function () {
    const label = document.querySelector(`label[for="${button.id}"]`);
    const img = label.querySelector('.mood-img');

    console.log(`Mood selected: ${button.value}`);

    if (previousButton) {
      const prevLabel = document.querySelector(
        `label[for="${previousButton.id}"]`
      );
      const prevImg = prevLabel.querySelector('.mood-img');
      prevImg.src = previousButton.getAttribute('data-outline');
    }

    const outlinePath = button.getAttribute('data-outline');
    const filledPath = button.getAttribute('data-fill');
    img.src = filledPath;
    img.alt = `${button.value}`;

    previousButton = button;
  });
}

let tasks = ['Task 1', 'Task 2', 'Task 3'];

function renderTasks() {
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
    });

    let taskText = document.createElement('span');
    taskText.textContent = tasks[i];

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function () {
      if (checkbox.checked) {
        deleteTask(i);
      } else {
        alert('Please select a task before deleting.');
      }
    };

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }
}

function addTask() {
  let taskInput = document.getElementById('taskInput');
  let task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.getElementById('addTaskButton').addEventListener('click', addTask);

renderTasks();

// const taskInput = document.getElementById('taskInput');
// const addTaskBtn = document.getElementById('addTaskButton');
// const taskList = document.getElementById('taskList');
// const deleteCompletedTasksBtn = document.getElementById('deleteButton');

// addTaskBtn.addEventListener('click', function () {
//   const taskText = taskInput.value;
//   if (taskText !== '') {
//     const newTask = document.createElement('li');
//     newTask.innerHTML = `<input type="checkbox" class="delete-checkbox"> ${taskText}`;
//     taskList.appendChild(newTask);
//     taskInput.value = '';
//   }
// });

// deleteCompletedTasksBtn.addEventListener('click', function () {
//   const checkboxes = document.querySelectorAll('.delete-checkbox');
//   checkboxes.forEach((checkbox) => {
//     if (checkbox.checked) {
//       checkbox.parentElement.remove();
//     }
//   });
// });

// const moodList = [
//   'excited',
//   'happy',
//   'surprised',
//   'neutral',
//   'trouble',
//   'sad',
//   'angry',
// ];

// function logMood(event) {
//   const clickedLabel = event.target.parentElement;
//   const radioId = clickedLabel.getAttribute('for');

//   if (moodList.includes(radioId)) {
//     console.log(`Selected mood: ${radioId}`);
//   }
// }
// const moodImages = document.querySelectorAll('.mood-img');
// moodImages.forEach((img) => {
//   img.addEventListener('click', logMood);
// });
