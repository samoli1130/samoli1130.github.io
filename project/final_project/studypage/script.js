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

function playTimerSound() {

    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();

    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gain.gain.value = 0.3;

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 1);

}


function showTimerNotification() {

    if ("Notification" in window) {

        if (Notification.permission === "granted") {

            new Notification("Timer Finished!", {
                body: "Your countdown has reached zero!"
            });

        }

        else if (Notification.permission !== "denied") {

            Notification.requestPermission().then(function(permission) {

                if (permission === "granted") {

                    new Notification("Timer Finished!", {
                        body: "Your countdown has reached zero!"
                    });

                }

            });

        }

    }

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

    playTimerSound();

    showTimerNotification();

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

    stopwatchDisplay.textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");

}

function startStopwatch() {
    if (stopwatchInterval !== null) {
        return;
    }

    stopwatchStartTime = Date.now() - stopwatchTime;
    stopwatchInterval = setInterval(function(){
        stopwatchTime=Date.now()-stopwatchStartTime;
        updateStopwatchDisplay();
    }, 10);
}

function pauseStopwatch() {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

}

function resetStopwatch() {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

    stopwatchTime = 0;

    updateStopwatchDisplay();

}


stopwatchStart.addEventListener("click", startStopwatch);

stopwatchPause.addEventListener("click", pauseStopwatch);

stopwatchReset.addEventListener("click", resetStopwatch);

updateStopwatchDisplay();



