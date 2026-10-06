  function addItem() {
      const input = document.getElementById("itemInput");
      const itemText = input.value.trim();

      if (itemText !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = itemText;

        document.getElementById("checklistItems").appendChild(listItem);

        input.value = "";
        input.focus();
      }
    }

    // Allow the Enter key to add an item.
    document.getElementById("itemInput").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        addItem();
      }
    });

