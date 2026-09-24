let currentSavings = 1000;
const withdrawClick = 100;
const depositClick = 100;

function withdrawAction() {
    currentSavings = currentSavings - withdrawClick;

    const savingsText = document.getElementById("savings-display");
    const statusText = document.getElementById("status-message");

    savingsText.innerText = currentSavings;

    if (currentSavings > 0)
         {
        savingsText.innerText = currentSavings;
        statusText.innerText = "Withdrew $100!";

    }
    else 
    {
        savingsText.innerText = 0;
        statusText.innerText = "Out of Money!";

        statusText.style.color = "#f1402c";
        statusText.style.fontWeight = "bold";
        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelector("button").disabled = true;
        document.querySelector("button").innerText = "Dead";
    }
}

function depositAction() {
    currentSavings = currentSavings + depositClick;

    const savingsText = document.getElementById("savings-display");
    const statusText = document.getElementById("status-message");

    savingsText.innerText = currentSavings;

    if (currentSavings > 0)
         {
        savingsText.innerText =  currentSavings;
        statusText.innerText = "Deposited $100!";

    }
    else 
    {
        savingsText.innerText = 0;
        statusText.innerText = "Out of Money!";

        statusText.style.color = "#f1402c";
        statusText.style.fontWeight = "bold";
        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelector("button").disabled = true;
        document.querySelector("button").innerText = "Dead";

}
}