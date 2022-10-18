const sketchContainer = document.querySelector(".grid-container");
let cells;
const units = 20;
let size = 2;

function makeBoard() {
    sketchContainer.textContent = "";
    for (let i = 0; i < units*size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        sketchContainer.appendChild(row);
        for (let j = 0; j < units*size; j++) {
            const col = document.createElement("span");
            col.classList.add("cell");
            row.appendChild(col);
        }
    }
    cells = document.querySelectorAll(".cell");
    cells.forEach(cell => assignRandomColor(cell));
    cells.forEach(cell => cell.addEventListener("mouseover", e => addHoverStyle(e, cell)));
    
}

makeBoard();

const game = document.querySelector(".etch-a-sketch");
const button = document.querySelector("button");
const leftKnob = document.querySelector("#left-knob");
const rightKnob = document.querySelector("#right-knob");
const leftKnobMark = document.querySelector("#left-knob-marker");
const rightKnobMark = document.querySelector("#right-knob-marker");

function changeSize() {
    size *= 2;

    // marker animation, right left top loop
    if (size == 4) {
        leftKnobMark.classList.add("knob-click");
    } else if (size > 4) {
        size = 1;
        leftKnobMark.classList.add("knob-click-two");
        leftKnobMark.classList.remove("knob-click");
    } else {
        leftKnobMark.classList.remove("knob-click-two");
    }

    makeBoard();
    cells.forEach(cell => {
        cell.style.padding = 160/(units*size) + "px";
        console.log(cell.style.padding);
    });
}

let hold = false;
function toggleHold() {
    hold = !hold;
    if (hold)
        rightKnobMark.classList.add("zero");
    else
        rightKnobMark.classList.remove("zero");
}

let holding = false;
window.addEventListener("mousedown", () => { holding = true });
window.addEventListener("mouseup", () => { holding = false });

function assignRandomColor(c) {
    const grey = 254 - Math.floor(Math.random() * 25);
    c.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
}

function addHoverStyle(event, c) {
    if (hold && holding || !hold) {
        const grey = 100 - Math.floor(Math.random() * 60);
        c.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
        c.classList.add("touched");
        event.stopPropagation();
    }
}

function cellErase(c) {
    const grey = Number.parseInt(c.style.backgroundColor.substring(4, 7));
    if (grey < 230) {
        const randGrey = 254 - Math.floor(Math.random() * 25);
        const newGrey = Math.min(grey * 1.25, randGrey);
        c.style.backgroundColor = `rgb(${newGrey}, ${newGrey}, ${newGrey})`;
    } else
        c.classList.remove("touched");
}

function updateShake(e) {
    if (!e.srcElement.classList.contains("etch-a-sketch")) return;
    document.querySelectorAll(".touched").forEach(cell => cellErase(cell));
    if (game.classList.contains("shake-down")) {
        game.classList.remove("shake-up");
        game.classList.remove("shake-down");
    } else if (game.classList.contains("shake-up"))
        game.classList.add("shake-down");
}

function shake() {
    game.classList.add("shake-up");
}

game.addEventListener("transitionend", e => updateShake(e));
button.addEventListener("click", shake);
rightKnob.addEventListener("click", toggleHold);
leftKnob.addEventListener("click", changeSize);