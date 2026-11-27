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



// Get music player elements
const studyAudio = document.getElementById("study-audio");
const musicCover = document.getElementById("music-cover");
const musicTitle = document.getElementById("music-title");
const musicPlay = document.getElementById("music-play");
const musicPause = document.getElementById("music-pause");
const musicBack = document.getElementById("music-back");
const musicForward = document.getElementById("music-forward");
const musicNext = document.getElementById("music-next");
const musicPrevious = document.getElementById("music-previous");

let currentSongIndex = 0;


const musicPlaylist = [

    {
        title: "Lofi Study",
        song: "music/zephiramusic-lofi-study-581724.mp3",
        cover: "images/Library.jpg"
    },

    {
        title: "Cafe Jazz Coffee Shop",
        song: "music/alex-morgan-cafe-jazz-coffee-shop-music-564287.mp3",
        cover: "images/SheetMusic.jpg"
    },

    {
        title: "Study Music Session",
        song: "music/alex-morgan-study-music-session-559993.mp3",
        cover: "images/PinkBooks.jpg"
    },

       {
        title: "Jazz Cafe Relaxing Smooth Cozy Ambience Podcast",
        song: "music/denis-pavlov-music-jazz-cafe-relaxing-smooth-cozy-ambience-podcast-484681.mp3",
        cover: "images/RainyImage.jpg"
    },

{
        title: "Study Music",
        song: "music/the_mountain-study-music-602501.mp3",
        cover: "images/OpenBook.jpg"
    }


];


function loadSong(index) {

    let selectedSong = musicPlaylist[index];
    studyAudio.src = selectedSong.song;
    musicCover.src = selectedSong.cover;
    musicTitle.textContent = selectedSong.title;
    currentSongIndex = index;

}


function playMusic() 
{
    studyAudio.play();
}

function pauseMusic()
 {
    studyAudio.pause();
}


function rewindMusic() {

    studyAudio.currentTime = Math.max(
        0,
        studyAudio.currentTime - 15
    );

}


function forwardMusic() {

    studyAudio.currentTime = Math.min(
        studyAudio.duration || Infinity,
        studyAudio.currentTime + 15
    );

}


function nextSong() {

    // Move to the next song
    currentSongIndex++;

    // Go back to the first song if we reach the end
    if (currentSongIndex >= musicPlaylist.length) {
        currentSongIndex = 0;
    }

    // Load the new song
    loadSong(currentSongIndex);

    // Start playing it
    playMusic();

}


function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) 
        {
        currentSongIndex = musicPlaylist.length - 1;
        }

    loadSong(currentSongIndex);

    playMusic();

}



musicPlay.addEventListener("click", playMusic);
musicPause.addEventListener("click", pauseMusic);
musicBack.addEventListener("click", rewindMusic);
musicForward.addEventListener("click", forwardMusic);
musicNext.addEventListener("click", nextSong);
musicPrevious.addEventListener("click", previousSong);


loadSong(currentSongIndex);
studyAudio.addEventListener("ended", nextSong);