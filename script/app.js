const sketchContainer = document.querySelector(".grid-container");
const rows = 40;
const cols = 40;

for(let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.classList.toggle("row");
    sketchContainer.appendChild(row);
    for(let j = 0; j < cols; j++) {
        let col = document.createElement("span");
        col.classList.toggle("cell");
        row.appendChild(col);
    }
}

const cells = document.querySelectorAll(".cell");

function assignRandomColor(c) {
    let grey = 250 - Math.floor(Math.random()*25);
    c.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;

    console.log(`rgb(${grey}, ${grey}, ${grey})`);
}

function addHoverStyle(event, element) {
    let grey = 100 - Math.floor(Math.random()*60);
    element.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
    event.stopPropagation();
}

cells.forEach(cell => assignRandomColor(cell));
cells.forEach(cell => cell.addEventListener("mouseenter", e => addHoverStyle(e,cell)));