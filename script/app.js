const sketchContainer = document.querySelector(".grid-container");
const rows = 36;
const cols = 36;

for(let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.toggle("row");
    sketchContainer.appendChild(row);
    for(let j = 0; j < cols; j++) {
        const col = document.createElement("span");
        col.classList.toggle("cell");
        row.appendChild(col);
    }
}

const cells = document.querySelectorAll(".cell");
const button = document.querySelector("button");

function assignRandomColor(c) {
    const grey = 254 - Math.floor(Math.random()*25);
    c.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
}

function addHoverStyle(event, c) {
    const grey = 100 - Math.floor(Math.random()*60);
    c.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
    event.stopPropagation();
}

function cellErase(c) {
    const grey = Number.parseInt(c.style.backgroundColor.substring(4,7));
    if(grey < 230) {
        const randGrey = 254 - Math.floor(Math.random()*25);
        const newGrey = Math.min(grey * 1.5, randGrey);
        c.style.backgroundColor = `rgb(${newGrey}, ${newGrey}, ${newGrey})`;
    }
    console.log(grey);
}

function updateShake(e) { 
    cells.forEach(cell => cellErase(cell))
    if(sketchContainer.classList.contains("shake-down")) {
        sketchContainer.classList.remove("shake-up");
        sketchContainer.classList.remove("shake-down");
    } else if(sketchContainer.classList.contains("shake-up"))
        sketchContainer.classList.add("shake-down");
}

function shake() {
    sketchContainer.classList.add("shake-up");
}

sketchContainer.addEventListener("transitionend", e => updateShake(e));
cells.forEach(cell => assignRandomColor(cell));
cells.forEach(cell => cell.addEventListener("mouseenter", e => addHoverStyle(e,cell)));
button.addEventListener("click", shake);