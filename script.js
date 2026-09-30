const lists = document.querySelectorAll(".list");
let nextCardId = 7;

for (const card of document.querySelectorAll(".card")) {
  enableDragging(card);
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);

  const addButton = list.querySelector(".add-card");
  addButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.className = "add-card-input";
    input.type = "text";
    input.placeholder = "Task title";
    input.setAttribute("aria-label", "New task title");
    addButton.hidden = true;
    addButton.after(input);
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        input.remove();
        addButton.hidden = false;
      }

      if (e.key === "Enter" && input.value.trim()) {
        const card = document.createElement("div");
        card.className = "card";
        card.id = `card${nextCardId++}`;
        card.draggable = true;
        card.textContent = input.value.trim();
        enableDragging(card);
        list.appendChild(card);
        input.remove();
        addButton.hidden = false;
      }
    });
  });
}

function enableDragging(card) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}

function dragStart(e) {
  // Allows the drop location to identify the card being moved
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("Drag Ended");
}

function dragOver(e) {
  // Allows elements to be dropped onto lists
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  e.preventDefault();

  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);

  this.appendChild(card);
  this.classList.remove("over");
}
