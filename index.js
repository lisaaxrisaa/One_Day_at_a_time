// const d = new Date();

// document.getElementById('date').innerHTML = d;

document.addEventListener('DOMContentLoaded', function () {
  const d = new Date();
  document.getElementById('date-demo').textContent = d.toDateString();
});

function changeMood() {
  const img = document.getElementById('excited-button');
  const whiteImg = 'img/excited-outline.svg';
  const blackImg = 'img/excited-filled.svg';
  if (img.src.endsWith(whiteImg)) {
    img.src = blackImg;
    img.alt = 'Excited face filled';
  } else {
    img.src = whiteImg;
    img.alt = 'Excited Face outline';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('mood-button');
  button.addEventListener('click', changeMood);
});
