
// Find the HTML elements
const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");

const assignmentName = document.getElementById("assignmentName");
const dueDate = document.getElementById("dueDate");
const className = document.getElementById("className");

// Add a new assignment when the form is submitted
assignmentForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Check that all required fields are filled in
    if (!assignmentForm.reportValidity()) {
        return;
    }

    // Create a new assignment
    createAssignment(
        assignmentName.value.trim(),
        dueDate.value,
        className.value.trim(),
        false
    );

    // Clear the form after adding the assignment
    assignmentForm.reset();

});


// Function to create an assignment
function createAssignment(name, date, classValue, completed) {

    // Create a new list item
    const listItem = document.createElement("li");

    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    // Create the assignment name
    const assignmentTitle = document.createElement("strong");
    assignmentTitle.textContent = name;

    // Create the class information
    const classText = document.createElement("span");
    classText.textContent = " | Class: " + classValue;

    // Create the due date information
    const dateText = document.createElement("span");
    dateText.textContent = " | Due Date: " + date;

    // Create the Edit button
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    // Create the Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    // Add all elements to the assignment
    listItem.appendChild(checkbox);
    listItem.appendChild(assignmentTitle);
    listItem.appendChild(classText);
    listItem.appendChild(dateText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Add the assignment to the checklist
    assignmentList.appendChild(listItem);

    // Check off an assignment
    checkbox.addEventListener("change", function() {

        if (checkbox.checked) {
            listItem.style.textDecoration = "line-through";
            listItem.style.opacity = "0.5";
        } else {
            listItem.style.textDecoration = "none";
            listItem.style.opacity = "1";
        }

    });

    // Apply completed appearance if already completed
    if (completed) {
        listItem.style.textDecoration = "line-through";
        listItem.style.opacity = "0.5";
    }

    // Edit an assignment
    editButton.addEventListener("click", function() {

        // Ask the user for updated information
        const newName = prompt(
            "Edit assignment name:",
            name
        );

        // Cancel editing if Cancel is selected
        if (newName === null) return;

        const newClass = prompt(
            "Edit class name:",
            classValue
        );

        if (newClass === null) return;

        const newDate = prompt(
            "Edit due date (YYYY-MM-DD):",
            date
        );

        if (newDate === null) return;

        // Make sure the fields are not empty
        if (
            newName.trim() === "" ||
            newClass.trim() === "" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(newDate) ||
            Number.isNaN(Date.parse(newDate)) ||
            new Date(newDate + "T00:00:00").toISOString().slice(0, 10) !== newDate
        ) {
            alert("Please enter a valid name and class.");
            return;
        }

        // Update the assignment information
        name = newName.trim();
        classValue = newClass.trim();
        date = newDate;

        assignmentTitle.textContent = name;
        classText.textContent = " | Class: " + classValue;
        dateText.textContent = " | Due Date: " + date;

    });

    // Delete an assignment
    deleteButton.addEventListener("click", function() {

        const confirmDelete = confirm(
            "Are you sure you want to delete this assignment?"
        );

        if (confirmDelete) {
            listItem.remove();
        }

    });

}
