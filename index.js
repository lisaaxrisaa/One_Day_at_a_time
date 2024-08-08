// const d = new Date();

// document.getElementById('date').innerHTML = d;

document.addEventListener('DOMContentLoaded', function () {
  const d = new Date();
  document.getElementById('date-demo').textContent = d.toDateString();
});

// function changeMood() {
//   const img = document.getElementById('excited-button');
//   const whiteImg = 'img/excited-outline.svg';
//   const blackImg = 'img/excited-filled.svg';
//   if (img.src.endsWith(whiteImg)) {
//     img.src = blackImg;
//     img.alt = 'Excited face filled';
//   } else {
//     img.src = whiteImg;
//     img.alt = 'Excited Face outline';
//   }
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const button = document.getElementById('mood-button');
//   button.addEventListener('click', changeMood);
// });

let moodButtons = document.querySelectorAll('.mood-button');

for (let i = 0; i < moodButtons.length; i++) {
  const button = moodButtons[i];

  button.addEventListener('click', function () {
    const img = button.querySelector('.mood-img');
    const currentSrc = img.src;
    const outlinePath = button.getAttribute('data-outline');
    const filledPath = button.getAttribute('data-filled');
    if (currentSrc.endsWith(outlinePath)) {
      img.src = filledPath;
      img.alt = 'Filled face';
    } else {
      img.src = outlinePath;
      img.alt = 'Outline face';
    }
  });
}
