// Carolina Game Day Checklist

// Array containing the items to bring
const items = [
"Game ticket",
"Carolina gear",
"Phone"
];

// Get the HTML elements we need
const form = document.getElementById("checklist-form");
const input = document.getElementById("item-input");
const checklist = document.getElementById("checklist-items");

// Display all items in the array
function displayItems() {
// Clear the current list
checklist.innerHTML = "";

// Add each item from the array to the unordered list
items.forEach(function(item) {
    const listItem = document.createElement("li");

    listItem.textContent = item;

    checklist.appendChild(listItem);
});


}

// Add a new item when the form is submitted
form.addEventListener("submit", function(event) {
// Prevent the page from refreshing
event.preventDefault();

// Get the text from the input
const newItem = input.value.trim();

// Only add the item if the textbox isn't empty
if (newItem !== "") {
    // Add the new item to the array
    items.push(newItem);

    // Update the list on the page
    displayItems();

    // Clear the textbox
    input.value = "";

    // Put the cursor back in the textbox
    input.focus();
}


});

// Display the starting items when the page loads
displayItems();