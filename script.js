let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);

  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (!isRunning) {
    // Start
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Stop';
    startStopBtn.classList.add('running');
    lapBtn.disabled = false;
    isRunning = true;
  } else {
    // Stop
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('running');
    lapBtn.disabled = true;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  startStopBtn.classList.remove('running');
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
  lapCount = 1;
}

function recordLap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${lapCount++}</span> <span>${formatTime(elapsedTime)}</span>`;
  lapsList.prepend(li);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);