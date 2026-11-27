
// GAME 1: CAT CATCHER


let score = 0;
let timeLeft = 10;
let timerId = null;
let catGameActive = false;

const timeDisplay = document.getElementById("time-display");
const scoreDisplay = document.getElementById("score-display");
const targetElement = document.getElementById("target");
const startButton = document.getElementById("start-btn");
const bombElement = document.getElementById("bomb");

function startGame() {

    if (catGameActive) {
        return;
    }

    score = 0;
    timeLeft = 10;
    catGameActive = true;

    timeDisplay.innerText = timeLeft;
    scoreDisplay.innerText = score;

    startButton.disabled = true;

    targetElement.style.display = "block";
    bombElement.style.display = "block";

    moveBomb();
    moveTarget();

    timerId = setInterval(countdown, 1000);
}

function countdown() {

    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function hitTarget() {

    if (!catGameActive) {
        return;
    }

    score++;
    scoreDisplay.innerText = score;

    moveTarget();
    moveBomb();
}

function moveTarget() {

    let randomX = Math.floor(Math.random() * 550);
    let randomY = Math.floor(Math.random() * 350);

    targetElement.style.left = randomX + "px";
    targetElement.style.top = randomY + "px";
}

function hitBomb() {

    if (!catGameActive) {
        return;
    }

    endGame();
}

function moveBomb() {

    let randomX = Math.floor(Math.random() * 550);
    let randomY = Math.floor(Math.random() * 350);

    bombElement.style.left = randomX + "px";
    bombElement.style.top = randomY + "px";
}

function endGame() {

    if (!catGameActive) {
        return;
    }

    catGameActive = false;

    clearInterval(timerId);

    targetElement.style.display = "none";
    bombElement.style.display = "none";

    startButton.disabled = false;

    alert("*WHISTLE* You Scored: " + score);
}


//SIDEBAR
function openSidebar() {

    document.getElementById("mySidebar").style.width = "250px";

}

function closeSidebar() {

    document.getElementById("mySidebar").style.width = "0";

}


// GAME 2: TIC TAC TOE

const squares = document.querySelectorAll(".square");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let currentPlayer = "X";

let board = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;


squares.forEach(function(square, index) {

    square.addEventListener("click", function() {

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = "X";
        square.textContent = "X";
        currentPlayer = "X";
        checkWinner();
        if (gameActive) {
            computerTurn();
        }

    });

});


function computerTurn() {

    let emptySquares = [];

    board.forEach(function(square, index) {

        if (square === "") {
            emptySquares.push(index);
        }

    });

    if (emptySquares.length === 0) {
        return;
    }

    let randomIndex = Math.floor(Math.random() * emptySquares.length);

    let computerMove = emptySquares[randomIndex];

    board[computerMove] = "O";
    squares[computerMove].textContent = "O";

    currentPlayer = "O";
    checkWinner();

    if (gameActive) {

        currentPlayer = "X";
        statusText.textContent = "Your Turn (X)";

    }

}


function checkWinner() {

    const winningCombinations = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            if (currentPlayer === "X") {

                statusText.textContent = "You Win!";

            } else {

                statusText.textContent = "Computer Wins!";

            }

            gameActive = false;
            return;

        }

    }

    if (!board.includes("")) {

        statusText.textContent = "It's a Tie!";
        gameActive = false;
        return;

    }

    statusText.textContent = "Your Turn (X)";

}


resetButton.addEventListener("click", function() {

    board = ["", "", "", "", "", "", "", "", ""];

    squares.forEach(function(square) {

        square.textContent = "";

    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Your Turn (X)";

});
