document.addEventListener('DOMContentLoaded', function () {
  const d = new Date();
  document.getElementById('date-demo').textContent = d.toDateString();

  if (!document.getElementById('datepicker').hasAttribute('data-initialized')) {
    const datepickerElement = document.getElementById('datepicker');
    const datepicker = new Datepicker(datepickerElement, {
      format: 'mm/dd/yyyy',
      autoHide: true,
    });

    datepickerElement.setAttribute('data-initialized', 'true');

    datepickerElement.addEventListener('changeDate', function (event) {
      const selectedDate = event.detail.date;
      const formattedDate = new Date(selectedDate).toDateString();
      document.getElementById('date-demo').textContent = formattedDate;

      const dayOfWeek = new Date(selectedDate).getDay();
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      const weekButtons = document.querySelectorAll('.week-button');
      weekButtons.forEach((button) => (button.checked = false));

      const dayRadioButton = document.getElementById(days[dayOfWeek]);
      if (dayRadioButton) {
        dayRadioButton.checked = true;
      }
    });
  }
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
let finishedTasks = [];

function renderTasks() {
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    checkbox.addEventListener('change', function () {
      handleCheckboxChange(i, checkbox);
    });

    let taskText = document.createElement('span');
    taskText.textContent = tasks[i];

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function () {
      if (checkbox.checked) {
        deleteTask(i);
      } else {
        alert('Please check the task before deleting.');
      }
    };

    let doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'done-button';
    doneButton.onclick = function () {
      if (checkbox.checked) {
        moveTaskToFinished(i);
      } else {
        alert('Please check the task as done before moving it.');
      }
    };

    let priorityButton = document.createElement('button');
    priorityButton.textContent = 'Move to Priority';
    priorityButton.className = 'priority-button';
    priorityButton.onclick = function () {
      if (checkbox.checked) {
        moveToPriority(i);
      } else {
        alert('Please check the task before moving it to priority list.');
      }
    };

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(doneButton);
    li.appendChild(deleteButton);
    li.appendChild(priorityButton);

    taskList.appendChild(li);
  }

  let finishedTaskList = document.getElementById('finishedTask');
  finishedTaskList.innerHTML = '';

  for (let j = 0; j < finishedTasks.length; j++) {
    let li = document.createElement('li');
    li.textContent = finishedTasks[j];
    finishedTaskList.appendChild(li);
  }
}

function addTask() {
  let taskInput = document.getElementById('taskInput');
  let task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
  } else {
    alert('Please input task before adding.');
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function moveTaskToFinished(index) {
  let taskText = tasks[index];
  finishedTasks.push(taskText);
  tasks.splice(index, 1);
  renderTasks();
}

function moveToPriority(index) {
  let taskText = tasks[index];
  const newPriority = document.createElement('li');
  newPriority.textContent = taskText;

  newPriority.draggable = true;
  addDragEvents(newPriority);
  addDeleteButton(newPriority);

  priorityList.appendChild(newPriority);
  tasks.splice(index, 1);
  renderTasks();
}

function handleCheckboxChange(index, checkbox) {}

document.getElementById('addTaskButton').addEventListener('click', addTask);

renderTasks();

const addPriorityButton = document.getElementById('addPriorityButton');
const priorityInput = document.getElementById('prioritiesInput');
const priorityList = document.getElementById('priorityList');

let draggedItem = null;

addPriorityButton.addEventListener('click', function () {
  const priorityText = priorityInput.value.trim();
  if (priorityText) {
    const newPriority = document.createElement('li');
    newPriority.textContent = priorityText;

    newPriority.draggable = true;
    addDragEvents(newPriority);
    addDeleteButton(newPriority);

    priorityList.appendChild(newPriority);

    priorityInput.value = '';
  }
});

function addDragEvents(li) {
  li.addEventListener('dragstart', function () {
    draggedItem = li;
    setTimeout(() => {
      li.style.display = 'none';
    }, 0);
  });

  li.addEventListener('dragend', function () {
    setTimeout(() => {
      draggedItem.style.display = 'block';
      draggedItem = null;
    }, 0);
  });

  li.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  li.addEventListener('drop', function (e) {
    e.preventDefault();
    if (draggedItem) {
      priorityList.insertBefore(draggedItem, li);
    }
  });
}

function addDeleteButton(li) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', function () {
    priorityList.removeChild(li);
  });

  li.appendChild(deleteButton);
}

// Priorities with up and down button
// const addPriorityButton = document.getElementById('addPriorityButton');
// const priorityInput = document.getElementById('prioritiesInput');
// const priorityList = document.getElementById('priorityList');

// addPriorityButton.addEventListener('click', function () {
//   const priorityText = priorityInput.value.trim();
//   if (priorityText) {
//     const newPriority = document.createElement('li');
//     newPriority.textContent = priorityText;
//     addButtonsToPriority(newPriority);
//     priorityList.appendChild(newPriority);
//     priorityInput.value = '';
//   }
// });

// function addButtonsToPriority(li) {
//   const upButton = document.createElement('button');
//   upButton.textContent = '↑';
//   upButton.className = 'upDownButton';
//   upButton.addEventListener('click', function () {
//     const previousItem = li.previousElementSibling;
//     if (previousItem) {
//       priorityList.insertBefore(li, previousItem);
//     }
//   });

//   const downButton = document.createElement('button');
//   downButton.textContent = '↓';
//   downButton.className = 'upDownButton';
//   downButton.addEventListener('click', function () {
//     const nextItem = li.nextElementSibling;
//     if (nextItem) {
//       priorityList.insertBefore(nextItem, li);
//     }
//   });

//   const deleteButton = document.createElement('button');
//   deleteButton.textContent = 'X';
//   deleteButton.className = 'delete-button';
//   deleteButton.addEventListener('click', function () {
//     priorityList.removeChild(li);
//   });

//   li.appendChild(upButton);
//   li.appendChild(downButton);
//   li.appendChild(deleteButton);
// }

// document.querySelectorAll('#priorityList li').forEach((li) => {
//   addButtonsToPriority(li);
// });
