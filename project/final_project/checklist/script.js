let assignments = [];
// Find the HTML elements
const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");

const assignmentName = document.getElementById("assignmentName");
const dueDate = document.getElementById("dueDate");
const className = document.getElementById("className");

assignmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!assignmentForm.reportValidity()) {
        return;
    }

    const newAssignment = {
        name: assignmentName.value.trim(),
        date: dueDate.value,
        classValue: className.value.trim(),
        completed: false
    };

    assignments.push(newAssignment);

    saveAssignments();

    displayAssignments();

    assignmentForm.reset();

});

function displayAssignments() {

    assignmentList.innerHTML = "";

    assignments.forEach(function(assignment) {

        createAssignment(
            assignment.name,
            assignment.date,
            assignment.classValue,
            assignment.completed
        );

    });

}

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

    const index = assignments.findIndex(function(a) {
        return a.name === name &&
               a.date === date &&
               a.classValue === classValue;
    });

    if (index !== -1) {
        assignments[index].completed = checkbox.checked;
        saveAssignments();
    }

});
    // Apply completed appearance if already completed
    if (completed) {
        listItem.style.textDecoration = "line-through";
        listItem.style.opacity = "0.5";
    }

    // Edit an assignment
editButton.addEventListener("click", function() {

    const newName = prompt("Edit assignment name:", name);

    if (newName === null) return;

    const newClass = prompt("Edit class name:", classValue);

    if (newClass === null) return;

    const newDate = prompt("Edit due date (YYYY-MM-DD):", date);

    if (newDate === null) return;

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

    const oldName = name;
    const oldClass = classValue;
    const oldDate = date;

    name = newName.trim();
    classValue = newClass.trim();
    date = newDate;

    assignmentTitle.textContent = name;
    classText.textContent = " | Class: " + classValue;
    dateText.textContent = " | Due Date: " + date;

    const index = assignments.findIndex(function(a) {
        return a.name === oldName &&
               a.date === oldDate &&
               a.classValue === oldClass;
    });

    if (index !== -1) {
        assignments[index].name = name;
        assignments[index].classValue = classValue;
        assignments[index].date = date;

        saveAssignments();
    }

});
    // Delete an assignment
    deleteButton.addEventListener("click", function() {

        const confirmDelete = confirm(
            "Are you sure you want to delete this assignment?"
        );

     if (confirmDelete) {

    const index = assignments.findIndex(function(a) {
        return a.name === name &&
               a.date === date &&
               a.classValue === classValue;
    });

    if (index !== -1) {
        assignments.splice(index, 1);
    }

    saveAssignments();

    listItem.remove();
}
    });

}

// Open the sidebar
function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
}

// Close the sidebar
function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
}
// SAVE ASSIGNMENTS
function saveAssignments() {

    localStorage.setItem(
        "myAssignments",
        JSON.stringify(assignments)
    );

}


// LOAD ASSIGNMENTS
function loadAssignments() {

    const saved = localStorage.getItem("myAssignments");

    if (saved !== null) {
        assignments = JSON.parse(saved);
    }

    displayAssignments();

}


// LOAD WHEN WEBSITE OPENS
loadAssignments();