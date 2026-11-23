
// ==========================================
// GAME 1: CAT CATCHER
// ==========================================

let score = 0;
let timeLeft = 10;
let timerId = null;
let catGameActive = false;

// Find the HTML elements
const timeDisplay = document.getElementById("time-display");
const scoreDisplay = document.getElementById("score-display");
const targetElement = document.getElementById("target");
const startButton = document.getElementById("start-btn");
const bombElement = document.getElementById("bomb");

// Start the cat game
function startGame() {

    // Prevent starting another timer while one is running
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

// Countdown timer
function countdown() {

    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

// When the cat is clicked
function hitTarget() {

    if (!catGameActive) {
        return;
    }

    score++;
    scoreDisplay.innerText = score;

    moveTarget();
    moveBomb();
}

// Move the cat
function moveTarget() {

    let randomX = Math.floor(Math.random() * 550);
    let randomY = Math.floor(Math.random() * 350);

    targetElement.style.left = randomX + "px";
    targetElement.style.top = randomY + "px";
}

// When the bomb is clicked
function hitBomb() {

    if (!catGameActive) {
        return;
    }

    endGame();
}

// Move the bomb
function moveBomb() {

    let randomX = Math.floor(Math.random() * 550);
    let randomY = Math.floor(Math.random() * 350);

    bombElement.style.left = randomX + "px";
    bombElement.style.top = randomY + "px";
}

// End the cat game
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


// ==========================================
// SIDEBAR
// ==========================================

// Open the sidebar
function openSidebar() {

    document.getElementById("mySidebar").style.width = "250px";

}

// Close the sidebar
function closeSidebar() {

    document.getElementById("mySidebar").style.width = "0";

}


// ==========================================
// GAME 2: TIC TAC TOE
// ==========================================

// Find the HTML elements
const squares = document.querySelectorAll(".square");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

// Keep track of whose turn it is
let currentPlayer = "X";

// Store the game board
let board = ["", "", "", "", "", "", "", "", ""];

// Check if the game is active
let gameActive = true;


// Listen for clicks on the squares
squares.forEach(function(square, index) {

    square.addEventListener("click", function() {

        // Don't allow clicking occupied squares or playing after game ends
        if (board[index] !== "" || !gameActive) {
            return;
        }

        // Player makes a move
        board[index] = "X";
        square.textContent = "X";

        currentPlayer = "X";

        // Check if player won
        checkWinner();

        // If game is still active, computer plays
        if (gameActive) {
            computerTurn();
        }

    });

});


// Computer's turn
function computerTurn() {

    // Find all empty squares
    let emptySquares = [];

    board.forEach(function(square, index) {

        if (square === "") {
            emptySquares.push(index);
        }

    });

    // Stop if there are no empty squares
    if (emptySquares.length === 0) {
        return;
    }

    // Choose a random empty square
    let randomIndex = Math.floor(Math.random() * emptySquares.length);

    let computerMove = emptySquares[randomIndex];

    // Place O on the board
    board[computerMove] = "O";
    squares[computerMove].textContent = "O";

    // Check if computer won
    currentPlayer = "O";
    checkWinner();

    // If nobody won, return turn to player
    if (gameActive) {

        currentPlayer = "X";
        statusText.textContent = "Your Turn (X)";

    }

}


// Check for a winner or tie
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

    // Check all winning combinations
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

    // Check for a tie
    if (!board.includes("")) {

        statusText.textContent = "It's a Tie!";
        gameActive = false;
        return;

    }

    // Keep the player informed
    statusText.textContent = "Your Turn (X)";

}


// Restart Tic Tac Toe
resetButton.addEventListener("click", function() {

    // Empty the board
    board = ["", "", "", "", "", "", "", "", ""];

    // Clear all squares
    squares.forEach(function(square) {

        square.textContent = "";

    });

    // Reset the game
    currentPlayer = "X";
    gameActive = true;

    // Update the message
    statusText.textContent = "Your Turn (X)";

});
