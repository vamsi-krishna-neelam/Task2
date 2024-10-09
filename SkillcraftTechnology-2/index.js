let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const restartBtn = document.getElementById("restartBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
        running = true;
        toggleButtons();
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); // Get milliseconds

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(num, digits = 1) {
    return num.toString().padStart(digits, '0');
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
    toggleButtons();
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00.00";
    lapList.innerHTML = "";
    lapCount = 0;
    toggleButtons();
}

function restartTimer() {
    resetTimer(); // Reset the timer
    startTimer(); // Start it again immediately
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function toggleButtons() {
    startBtn.disabled = running;
    pauseBtn.disabled = !running;
    lapBtn.disabled = !running;
    restartBtn.disabled = !running; // Enable restart only while running
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
restartBtn.addEventListener("click", restartTimer); // Event listener for restart
lapBtn.addEventListener("click", recordLap);
