let score = 0;
let timeLeft = 10;
let timerId = null;

const timeDisplay = document.getElementById("time-display");
const scoreDisplay = document.getElementById("score-display");
const targetElement = document.getElementById("target");
const startButton = document.getElementById("start-btn");
const bombElement = document.getElementById("bomb");

function startGame()
{
    score = 0;
    timeLeft = 10;
    timeDisplay.innerText = timeLeft;
    scoreDisplay.innerText = score;

    startButton.disabled = true;
    targetElement.style.display = "block";
    bombElement.style.display = "block";

    moveBomb();
    moveTarget();
    
    timerId = setInterval(countdown, 1000);

}

function countdown()
{
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if(timeLeft <= 0)
    {
        endGame();
    }
}

function hitTarget()
{
    score++;
    scoreDisplay.innerText = score;
    moveTarget();
    moveBomb();
}

function moveTarget()
{
    let randomX = Math.floor(Math.random() * 550);
    let randomY = Math.floor(Math.random() * 350);

    targetElement.style.left = randomX + "px";
    targetElement.style.top = randomY + "px";
}

function endGame()
{
    clearInterval(timerId);

    targetElement.style.display = "none";
    bombElement.style.display = "none";
    startButton.disabled = false;

    alert("*WHISTLE* You Scored:" + score);
}

function hitBomb()
{
   
    endGame();
}

function moveBomb()
{
    let randomX = Math.floor(Math.random() * 550);
    let randomY = Math.floor(Math.random() * 350);

    bombElement.style.left = randomX + "px";
    bombElement.style.top = randomY + "px";

}

// Open the sidebar
function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
}

// Close the sidebar
function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
}


// Find the HTML elements
const squares = document.querySelectorAll(".square");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

// Keep track of whose turn it is
let currentPlayer = "X";

// Store the game board
let board = ["", "", "", "", "", "", "", "", ""];

// Check if the game is over
let gameActive = true;


squares.forEach(function(square, index) {

    square.addEventListener("click", function() {

        // Don't allow clicking occupied squares
        if (board[index] !== "" || !gameActive) {
            return;
        }

        // Player makes a move
        board[index] = "X";
        square.textContent = "X";

        // Check if player won
        currentPlayer = "X";
        checkWinner();

        // If game is still active, computer plays
        if (gameActive) {
            computerTurn();
        }

    });

});

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

    // Check for a tie
    if (!board.includes("")) {

        statusText.textContent = "It's a Tie!";
        gameActive = false;
        return;

    }

    // Keep the player informed
    statusText.textContent = "Your Turn (X)";
}
