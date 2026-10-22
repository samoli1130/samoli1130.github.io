let linesOfCode = 0;

let clickPower = 1;
let upgradeCost = 50;

let interns = 0;
let internCost = 100;

let managers = 0;
let upgradeCost = 500;

let computerCost = 250;
let computerPower = 0
let totalClick = clickPower + computerPower;

function writeCode() 
{
    linesOfCode = linesOfCode + clickPower + computerPower;
    updateScreen();
}

function buyKeyboard()
{
    if( linesOfCode >= upgradeCost )
    {
        linesOfCode = linesOfCode - upgradeCost;
        clickPower = clickPower + 1;
        upgradeCost = upgradeCost * 1.5;
        updateScreen();
    }
}

function buyComputer()
{
    if( linesOfCode >= computerCost)
    {
        linesOfCode = linesOfCode - computerCost;
        computerPower = computerPower + 5;
        computerCost = computerCost * 1.5;
        updateScreen();
    }
}


function buyIntern()
{
    if(linesOfCode >= internCost)
    {
        linesOfCode = linesOfCode - internCost;
        interns = interns + 1;
        internCost = internCost * 1.5;
        updateScreen();
    }
}

function updateScreen()
{
    document.getElementById("score-display").innerText = linesOfCode + " lines of code";

    document.getElementById("power-display").innerText = clickPower;
    document.getElementById("cost-display").innerText = upgradeCost;

    document.getElementById("intern-display").innerText = interns;
    document.getElementById("cost-intern-display").innerText = internCost;

    document.getElementById("total-click-display").innerText = totalClick;

    document.getElementById("computer-display").innerText = computerPower;
    document.getElementById("cost-computer-display").innerText = computerCost;
}

setInterval(function() {
if(interns > 0)
    {
     linesOfCode = linesOfCode + interns;
     updateScreen();
    }
},
1000
);

