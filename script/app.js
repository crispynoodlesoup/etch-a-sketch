const sketchContainer = document.querySelector(".grid-container");
const rows = 32;
const cols = 32;

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

const game = document.querySelector(".etch-a-sketch");
const cells = document.querySelectorAll(".cell");
const button = document.querySelector("button");

function assignRandomColor(c) {
    const grey = 254 - Math.floor(Math.random()*25);
    c.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
}

function addHoverStyle(event, c) {
    const grey = 100 - Math.floor(Math.random()*60);
    c.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
    c.classList.add("touched");
    event.stopPropagation();
}

function cellErase(c) {
    const grey = Number.parseInt(c.style.backgroundColor.substring(4,7));
    if(grey < 230) {
        const randGrey = 254 - Math.floor(Math.random()*25);
        const newGrey = Math.min(grey * 1.25, randGrey);
        c.style.backgroundColor = `rgb(${newGrey}, ${newGrey}, ${newGrey})`;
    } else
        c.classList.remove("touched");
}

function updateShake(e) { 
    document.querySelectorAll(".touched").forEach(cell => cellErase(cell));
    if(game.classList.contains("shake-down")) {
        game.classList.remove("shake-up");
        game.classList.remove("shake-down");
    } else if(game.classList.contains("shake-up"))
        game.classList.add("shake-down");
}

function shake() {
    game.classList.add("shake-up");
}

game.addEventListener("transitionend", e => updateShake(e));
cells.forEach(cell => assignRandomColor(cell));
cells.forEach(cell => cell.addEventListener("mouseenter", e => addHoverStyle(e,cell)));
button.addEventListener("click", shake);