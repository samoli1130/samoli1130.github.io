const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const timerDisplay = document.getElementById("timerDisplay");

const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const pauseButton = document.getElementById("pause-btn");

let timeLeft = 0;
let originalTime = 0;
let timerInterval= null;

function updateDisplay() {
    let minutes = Math.floor(timeLeft/60);
    let seconds = timeLeft % 60;

    timerDisplay.textContent = 
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function startTimer() 
{
    if (timerInterval !== null) {
        return;
    }
    

    if (timeLeft === 0) {
        let minutes= Number(minutesInput.value);
        let seconds = Number(secondsInput.value);

        if (
            !Number.isInteger(minutes) ||
            !Number.isInteger(seconds) ||
            minutes < 0 ||
            seconds < 0 ||
            seconds > 59 ||
            (minutes === 0 && seconds === 0)
        ){
            alert("Please enter a time");
            return;

        }
         timeLeft = (minutes * 60) + seconds;
        originalTime = timeLeft;
    }
      timerInterval = setInterval(function() {

        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
        }

    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer(){
    clearInterval(timerInterval);
     timerInterval = null; 
     timeLeft = 0;
     originalTime = 0;
     updateDisplay();
}


startButton.addEventListener("click", startTimer);

pauseButton.addEventListener("click", pauseTimer);

resetButton.addEventListener("click", resetTimer);

updateDisplay();



const stopwatchDisplay = document.getElementById("stopwatch-display");
const stopwatchStart = document.getElementById("stopwatch-start");
const stopwatchPause = document.getElementById("stopwatch-pause");
const stopwatchReset = document.getElementById("stopwatch-reset");

let stopwatchTime = 0;
let stopwatchInterval = null; 
let stopwatchStartTime= 0;

function updateStopwatchDisplay() {
    let minutes = Math.floor(stopwatchTime / 60000);
    let seconds = Math.floor((stopwatchTime % 60000) / 1000);
    let milliseconds = Math.floor((stopwatchTime % 1000) / 10);

    stopwatchDisplay.textContent =
    string(minutes).padStart (2, "0") + ":" +
    string(seconds).padStart (2, "0") + ":" + 
    string(milliseconds).padStart (2, "0");

}

function startStopwatch() {
    if (stopwatchInterval !== null) {
        restart;
    }

    stopwatchStartTime = Date.now() - stopwatchTime;
    stopwatchInterval = setInterval(function(){
        stopwatchTime=Date.now()-stopwatchStartTime;
        updateStopwatchDisplay();
    }, 10);
}

function stopwatchPause() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;

}

function stopwatchReset () {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    updateStopwatchDisplay();

}

stopwatchStart.addEventListener("click", startStopwatch);

stopwatchPause.addEventListener("click", pauseStopwatch);

stopwatchReset.addEventListener("click", resetStopwatch);

updateStopwatchDisplay();