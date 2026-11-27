const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const timperDisplay = document.getElementById("timerDisplay");

const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const pauseButton = document.getElementById("pause-btn");

let timeLeft = 0;
let originalTime = 0;
let timeInterval= null;

function updateDisplay() {
    let minutes = Math.floor(timeLeft/60);
    let seconds = timeLeft % 60;

    timerDisplay.textContent = 
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

startTimer() 
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
     timeLeft = originalTime; 
     updateDisplay();
}


startButton.addEventListener("click", startTimer);

pauseButton.addEventListener("click", pauseTimer);

resetButton.addEventListener("click", resetTimer);

updateDisplay();