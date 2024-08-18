// const d = new Date();

// document.getElementById('date').innerHTML = d;

document.addEventListener('DOMContentLoaded', function () {
  const d = new Date();
  document.getElementById('date-demo').textContent = d.toDateString();
});

// let moodButtons = document.querySelectorAll('input[type="radio"]');
// let previousButton = null;

// for (let i = 0; i < moodButtons.length; i++) {
//   const button = moodButtons[i];

//   button.addEventListener('change', function () {
//     if (previousButton) {
//       const prevLabel = document.querySelector(
//         `label[for="${previousButton.id}"]`
//       );
//       const prevImg = prevLabel.querySelector('.mood-img');
//       prevImg.src = previousButton.getAttribute('data-outline');
//     }

//     const label = document.querySelector(`label[for="${button.id}"]`);
//     const img = label.querySelector('.mood-img');
//     img.src = button.getAttribute('data-fill');
//     img.alt = button.value;

//     previousButton = button;
//   });
// }

let moodButtons = document.querySelectorAll('input[type="radio"]');
let previousButton = null;

for (let i = 0; i < moodButtons.length; i++) {
  const button = moodButtons[i];

  button.addEventListener('click', function () {
    const label = document.querySelector(`label[for="${button.id}"]`);
    const img = label.querySelector('.mood-img');

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

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const deleteCompletedTasksBtn = document.getElementById('deleteButton');

addTaskBtn.addEventListener('click', function () {
  const taskText = taskInput.value;
  if (taskText !== '') {
    const newTask = document.createElement('li');
    newTask.innerHTML = `<input type="checkbox" class="delete-checkbox"> ${taskText}`;
    taskList.appendChild(newTask);
    taskInput.value = '';
  }
});

deleteCompletedTasksBtn.addEventListener('click', function () {
  const checkboxes = document.querySelectorAll('.delete-checkbox');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.parentElement.remove();
    }
  });
});

const moodList = [
  'excited',
  'happy',
  'surprised',
  'neutral',
  'trouble',
  'sad',
  'angry',
];

function logMood(event) {
  const clickedLabel = event.target.parentElement;
  const radioId = clickedLabel.getAttribute('for');

  if (moodList.includes(radioId)) {
    console.log(`Selected mood: ${radioId}`);
  }
}
const moodImages = document.querySelectorAll('.mood-img');
moodImages.forEach((img) => {
  img.addEventListener('click', logMood);
});
