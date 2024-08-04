// const d = new Date();

// document.getElementById('date').innerHTML = d;

document.addEventListener('DOMContentLoaded', function () {
  const d = new Date();
  document.getElementById('date-demo').textContent = d.toDateString();
});
