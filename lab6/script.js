const sections = document.querySelectorAll("main section");

const homepage = document.getElementById("homepage");

const csce102Button = document.getElementById("csce-102-tab");
const univ101Button = document.getElementById("univ-101-tab");
const musc123Button = document.getElementById("musc-123-tab");
const schc453Button = document.getElementById("schc-453-tab");
const biol102Button = document.getElementById("biol-102-tab");

sections.forEach(function(section) {
    if (section.id !== "homepage") {
        section.style.display = "none";
    }
});

function showSection(sectionId) {
    sections.forEach(function(section) {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}

csce102Button.addEventListener("click", function() {
    showSection("csce-102");
});

univ101Button.addEventListener("click", function() {
    showSection("univ-101");
});

musc123Button.addEventListener("click", function() {
    showSection("musc-123");
});

schc453Button.addEventListener("click", function() {
    showSection("schc-453");
});

biol102Button.addEventListener("click", function() {
    showSection("biol-102");
});