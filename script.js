const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "red";
const DEFAULT_MODE = "color";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

const divGrid = document.getElementById('divGrid');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const buttonBlack = document.getElementById('buttonBlack');
const buttonRainbow = document.getElementById('buttonRainbow');
const buttonErase = document.getElementById('buttonErase');
const buttonClear = document.getElementById('buttonClear');

sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
buttonBlack.onclick = () => setCurrentColor('black');
buttonRainbow.onclick = () => {currentMode = 'rainbow'};
buttonErase.onclick = () => setCurrentColor('white');
buttonClear.onclick = () => updateGrid();

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    updateGrid(value);
}

function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`;
}

function updateGrid() {
    clearGrid();
    makeGrid(currentSize);
}

function clearGrid() {
    divGrid.innerHTML = '';
}

function makeGrid(size) {
    divGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    divGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (i = 0; i < size * size; i++ ) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener ('mousedown', changeColor);
        tile.addEventListener('mouseover', changeColor);
        divGrid.appendChild(tile);
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return; 
    else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;}
    else {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}

window.addEventListener('load', makeGrid(currentSize));