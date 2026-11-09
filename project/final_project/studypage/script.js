let timeLeft= 0;
let timeInterval= nul; 

function updateDisplay () {
    let minutes= Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart( 2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function startTimer(){
    if (timerInterval !== null) return;

    if (timeLeft === 0) {
        let input= document.getElementById("minutes").value;
        timeLeft = Number(input) * 60;

         if (timeLeft <= 0) return;

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